import React, { Component } from "react";
import Router from "next/router"
import uuid from "uuid/v4";
import { message } from "antd";
import { Layout, WrapLink, CityList } from "@components";
import { http, cache } from "@utils";

export default class extends Component {
  state = {
    userCity: null,
    hot_stations: null,
    stations: null
  };
  componentDidMount() {
    this.onMessageData();
    const userCity = cache.getItem("userCity");
    if (userCity) {
      // eslint-disable-next-line
      this.setState(() => ({ userCity: userCity }));
    }
  }
  onMessageData = () => {
    http
      .get("station/choose_station_page")
      .then(response => {
        if (response.code === 200 && response.success) {
          const { hot_stations, stations } = response.data;
          this.setState(() => ({ hot_stations, stations }));
        }
      })
      .catch(err => {
        message.error("网络错误，请稍后再试！");
        console.info(err);
      });
  };
  onCacheCity = name => {
    cache.setItem("userCity", name);
    Router.replace({ pathname: "/index" }, "/");
  };
  render() {
    const { userCity, hot_stations, stations } = this.state;
    return (
      <Layout title="城市">
        <div className="box">
          {/* 定位城市  热门城市 */}
          <div className="city-head-bg mt15 pt20">
            <div className="lh100 font16 c333">
              当前定位城市<WrapLink className="bold ml30">{userCity}</WrapLink>
            </div>
            <div className="city-hot-icon lh100 font16 c333 pl25">
              热门城市{hot_stations &&
                hot_stations.length > 0 &&
                hot_stations.map(item => (
                  <WrapLink
                    key={uuid()}
                    onClick={() => this.onCacheCity(item.name)}
                    className="ml30 c-main bold"
                  >
                    {item.name}
                  </WrapLink>
                ))}
            </div>
          </div>
          <div style={{ minHeight: "350px", marginBottom: "95px" }}>
            {stations &&
              stations.length > 0 &&
              stations.map(item => {
                if (item.city.length > 0) {
                  return (
                    <CityList
                      key={uuid()}
                      item={item}
                      onCacheCity={this.onCacheCity}
                    />
                  );
                }
                return null;
              })}
          </div>
        </div>
      </Layout>
    );
  }
}

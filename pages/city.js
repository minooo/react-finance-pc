import React, { Component } from "react";
import uuid from "uuid/v4";
import { Layout, WrapLink } from "@components";

export default class extends Component {
  state = {
    hot_stations: [
      {
        id: 1,
        name: "北京",
        level: 1,
        agent_id: 1,
        province_id: 110000,
        city_id: 110100,
        county_id: 110112,
        create_user_id: 1,
        user_id: 1,
        is_hot: 1,
        created_at: "2018-02-02 10:42:30",
        updated_at: "2018-02-23 14:46:19"
      },
      {
        id: 3,
        name: "郑州",
        level: 2,
        agent_id: 1,
        province_id: 410000,
        city_id: 410100,
        county_id: 410105,
        create_user_id: 1,
        user_id: 1,
        is_hot: 1,
        created_at: "2018-02-23 14:21:59",
        updated_at: "2018-02-23 14:46:24"
      },
      {
        id: 4,
        name: "浙江",
        level: 1,
        agent_id: 1,
        province_id: 330000,
        city_id: null,
        county_id: null,
        create_user_id: 1,
        user_id: 1,
        is_hot: 1,
        created_at: "2018-02-26 10:39:31",
        updated_at: "2018-02-26 10:39:31"
      },
      {
        id: 5,
        name: "安徽",
        level: 1,
        agent_id: 1,
        province_id: 330000,
        city_id: null,
        county_id: null,
        create_user_id: 1,
        user_id: 1,
        is_hot: 1,
        created_at: "2018-02-26 11:17:33",
        updated_at: "2018-02-26 11:17:35"
      }
    ],
    stations: {
      A: [
        {
          id: 5,
          name: "安徽"
        }
      ],
      B: [
        {
          id: 1,
          name: "北京"
        }
      ],
      H: [
        {
          id: 2,
          name: "黄浦区"
        }
      ],
      Z: [
        {
          id: 3,
          name: "郑州"
        },
        {
          id: 4,
          name: "浙江"
        }
      ]
    }
  };
  render() {
    const { hot_stations, stations } = this.state;
    return (
      <Layout title="城市">
        <div className="box">
          {/* 定位城市  热门城市 */}
          <div className="city-head-bg mt15 pt20">
            <div className="lh100 font16 c333">
              当前定位城市<WrapLink className="bold ml30">郑州</WrapLink>
            </div>
            <div className="city-hot-icon lh100 font16 c333 pl25">
              热门城市{hot_stations &&
                hot_stations.length > 0 &&
                hot_stations.map(item => (
                  <WrapLink key={uuid()} className="ml30 c-main bold">
                    {item.name}
                  </WrapLink>
                ))}
            </div>
          </div>
          <div style={{ minHeight: "350px", marginBottom: "95px" }}>
            {stations &&
              Object.keys(stations).length > 0 &&
              Object.keys(stations).map(item => (
                <div key={uuid()} className="flex city-list">
                  <div className="w30 lh100 c666 bold font14 flex ai-center jc-center city-serial">
                    {item}
                  </div>
                  <div className="equal lh100 font14 city-item">
                    {stations &&
                      Object.keys(stations).length > 0 &&
                      stations[item].map(i => (
                        <WrapLink
                          key={uuid()}
                          style={{ marginBottom: "12px" }}
                          className=" ml30 c333 inline-block"
                        >
                          {i.name}
                        </WrapLink>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    );
  }
}

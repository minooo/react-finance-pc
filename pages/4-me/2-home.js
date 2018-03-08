import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";
import Router from "next/router";
import { http, cache } from "@utils";
import { getUser } from "@actions";
import reduxPage from "@reduxPage";
import { MeSelection, MeFormOne } from "@components";

function areaToStr(a, b, c) {
  const a1 = a || "";
  const b1 = b ? ` / ${b}` : "";
  const c1 = c ? ` / ${c}` : "";
  return a1 + b1 + c1;
}

function areaToArr(a, b, c) {
  const arr = [];
  arr.push(a, b, c);
  return arr;
}

@reduxPage
@connect(({ user }) => ({ user }), {
  getUser
})
export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { pathname } = ctx;
    return { pathname };
  }
  state = { isLoading: false, initDisabled: true };
  componentDidMount() {
    const { user } = this.props;
    if (!user) {
      this.initData();
    }
    document.domain = "duduapp.net"
  }
  onNextOne = param => {
    this.goNext("base", param);
  };
  onEdit = () => {
    this.setState(() => ({ initDisabled: false }));
  };
  goNext = (reqKey, param) => {
    const { url: { query } } = this.props
    this.setState(
      () => ({ isLoading: true, initDisabled: true }),
      () => {
        http
          .post(`member/${reqKey}_profile`, param)
          .then(response => {
            this.setState(() => ({ isLoading: false }));
            if (response.code === 200 && response.success) {
              cache.setItem("userName", param.username);
              cache.setItem("userId", param.idNum);
              this.initData();
              message.success("资料保存成功", 2, () => {
                if (query) {
                  if (query.requireData) {
                    if (!cache.getItem("userJob")) {
                      Router.push({ pathname: "/4-me/3-other-data", query }, "/me/other")
                      return
                    }
                    Router.push(
                      { pathname: query.href, query },
                      query.as
                    );
                    return
                  }
                }
                Router.push("/4-me/3-other-data", "/me/other")
              });
            } else {
              message.error(response.msg || "抱歉，请求异常，请稍后再试！");
            }
          })
          .catch(err => {
            message.error("网络错误，请稍后再试！");
            console.info(err);
          });
      }
    );
  };
  initData = () => {
    const { getUser } = this.props;
    http
      .get("member/base_profile")
      .then(response => {
        if (response.code === 200 && response.success) {
          getUser(response.data);
        } else {
          Router.replace({ pathname: "/4-me/1-login" }, "/login");
        }
      })
      .catch(() => {
        Router.replace({ pathname: "/4-me/1-login" }, "/login");
        message.error("抱歉，网络异常，请稍后再试！");
      });
  };
  render() {
    const { isLoading, initDisabled } = this.state;
    const { pathname, user } = this.props;
    return (
      <MeSelection pathname={pathname}>
        <div className="h50" />
        {user && (
          <MeFormOne
            initNickName={user.base.username || user.base.phone}
            initName={user.base.name}
            initAreaName={areaToStr(
              user.base.province_name,
              user.base.city_name,
              user.base.county_name
            )}
            initAreaVal={areaToArr(
              user.base.province_id,
              user.base.city_id,
              user.base.county_id
            )}
            initStationId={user.base.station_id}
            initAvatar={user.base.avatar}
            initMobile={user.base.phone}
            initSex={user.sex}
            initMySex={user.base.sex}
            initAge={user.base.age}
            initIdNum={user.base.idNum}
            initMarry={user.marital_status}
            initMyMarry={user.base.marital_status}
            initProvince={user.province}
            isLoading={isLoading}
            initDisabled={initDisabled}
            onEdit={this.onEdit}
            onNextOne={this.onNextOne}
          />
        )}
      </MeSelection>
    );
  }
}

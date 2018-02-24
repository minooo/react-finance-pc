import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";
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

// function areaToArr(a, b, c) {
//   const arr = []
//   arr.push(a, b, c)
//   return arr
// }

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
  state = { isLoading: false };
  componentDidMount() {
    const { getUser, user } = this.props;
    if (!user) {
      http
        .get("member/base_profile")
        .then(response => {
          if (response.code === 200 && response.success) {
            getUser(response.data);
          } else {
            message.error(response.msg || "抱歉，请求出错。");
          }
        })
        .catch(() => {
          message.error("抱歉，网络异常，请稍后再试！");
        });
    }
  }
  onNextOne = param => {
    this.goNext("base", param);
  };
  goNext = (reqKey, param) => {
    this.setState(
      () => ({ isLoading: true }),
      () => {
        http
          .post(`member/${reqKey}_profile`, param)
          .then(response => {
            this.setState(() => ({ isLoading: false }));
            if (response.code === 200 && response.success) {
              cache.setItem("userName", param.username);
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
  render() {
    const { isLoading } = this.state;
    const { pathname, user } = this.props;
    return (
      <MeSelection pathname={pathname}>
        <div className="h50" />
        {user && (
          <MeFormOne
            initNickName={user.base.username || user.base.phone}
            initName={user.base.name || user.base.phone}
            initAreaName={areaToStr(
              user.base.province_name,
              user.base.city_name,
              user.base.county_name
            )}
            initMobile={user.base.phone}
            initSex={user.sex}
            initMySex={user.base.sex}
            initAge={user.base.age}
            initIdNum={user.base.idNum}
            initMarry={user.marital_status}
            initMyMarry={user.base.marital_status}
            initProvince={user.province}
            isLoading={isLoading}
            onNextOne={this.onNextOne}
          />
        )}
      </MeSelection>
    );
  }
}

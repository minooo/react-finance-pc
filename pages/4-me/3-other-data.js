import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";
import { http } from "@utils";
import { getUser, getUserOther } from "@actions";
import reduxPage from "@reduxPage";
import { MeSelection, MeFormOne, LoanFormTwo } from "@components";

@reduxPage
@connect(({ user, userOther }) => ({ user, userOther }), {
  getUser,
  getUserOther
})
export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { pathname } = ctx;
    return { pathname };
  }
  state = { focus: 0, isLoading: false };
  componentDidMount() {
    const {
      getUser,
      getUserOther,
      user,
      userOther,
      url: { replace }
    } = this.props;
    if (!user || !userOther) {
      http
        .get("member/base_profile")
        .then(response => {
          if (response.code === 200 && response.success) {
            getUser(response.data);
            http
              .get("member/other_profile")
              .then(response => {
                if (response.code === 200 && response.success) {
                  getUserOther(response.data);
                } else {
                  replace({ pathname: "/4-me/1-login" }, "/login");
                  message.error(response.msg || "抱歉，请求出错。");
                }
              })
              .catch(() => {
                replace({ pathname: "/4-me/1-login" }, "/login");
                message.error("抱歉，网络异常，请稍后再试！");
              });
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
    this.goNext("base", param, 1);
  };
  onNextTwo = param => {
    this.goNext("other", param, 2);
  };
  goNext = (reqKey, param, step) => {
    this.setState(
      () => ({ isLoading: true }),
      () => {
        http
          .post(`member/${reqKey}_profile`, param)
          .then(response => {
            this.setState(() => ({ isLoading: false }));
            if (response.code === 200 && response.success) {
              this.setState(() => ({ focus: step }));
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
    const { focus, isLoading } = this.state;
    const { pathname, user, userOther } = this.props;
    return (
      <MeSelection pathname={pathname}>
        <div className="h50" />
        {/* 第一步，基本信息 */}
        {focus === 0 &&
          user && (
            <MeFormOne
              initNickName={user.base.username || user.base.phone}
              initName={user.base.name || user.base.phone}
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
        {/* 第二步，其他信息 */}
        {focus === 1 &&
          userOther && (
            <LoanFormTwo
              initJob={userOther.identity_status}
              initIncomeWay={userOther.income_mode}
              initCredit={userOther.credit_condition}
              initAsset={userOther.asset}
              isLoading={isLoading}
              onNextTwo={this.onNextTwo}
            />
          )}
      </MeSelection>
    );
  }
}

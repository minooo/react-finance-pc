import React, { Component } from "react";
import { connect } from "react-redux";
import { message } from "antd";
import Router from "next/router";
import { http, cache } from "@utils";
import { getUserOther } from "@actions";
import reduxPage from "@reduxPage";
import { MeSelection, MeFormTwo } from "@components";

@reduxPage
@connect(({ userOther }) => ({ userOther }), {
  getUserOther
})
export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { pathname } = ctx;
    return { pathname };
  }
  state = { isLoading: false, initDisabled: true };
  componentDidMount() {
    const { userOther } = this.props;
    if (!userOther) {
      this.initData();
    }
  }
  onNextTwo = param => {
    this.goNext("other", param);
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
              cache.setItem("userJob", param.identity_status);
              this.initData();
              message.success("资料保存成功", 2, () => {
                if (query) {
                  Router.push({ pathname: query.href, query }, query.as)
                }
                Router.push("/index", "/")
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
    const { getUserOther } = this.props;
    http
      .get("member/other_profile")
      .then(response => {
        if (response.code === 200 && response.success) {
          getUserOther(response.data);
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
    const { pathname, userOther } = this.props;
    return (
      <MeSelection pathname={pathname}>
        <div className="h50" />
        {/* 第二步，其他信息 */}
        {userOther && (
          <MeFormTwo
            noapply="true"
            initJob={userOther.identity_status}
            initMyJob={userOther.info.identity_status}
            initIncomeWay={userOther.income_mode}
            initMyIncomeWay={userOther.info.income_mode}
            initMyMonthlyIncome={userOther.info.monthly_income}
            initMyMonthlyTurnover={userOther.info.monthly_turnover}
            initMyMonthlyBusinessAccountIncome={
              userOther.info.monthly_business_account_income
            }
            initMyCashSettlementOperatingIncome={
              userOther.info.cash_settlement_operating_income
            }
            initCredit={userOther.credit_condition}
            initMyCredit={
              userOther.info.asset && userOther.info.asset.credit_condition
            }
            initAsset={userOther.asset}
            initMyAsset={userOther.info.asset}
            isLoading={isLoading}
            initDisabled={initDisabled}
            onEdit={this.onEdit}
            onNextTwo={this.onNextTwo}
          />
        )}
      </MeSelection>
    );
  }
}

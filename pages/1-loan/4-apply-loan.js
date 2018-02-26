import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import { message } from "antd";
import { http } from "@utils";
import { getUser, getUserOther } from "@actions";
import reduxPage from "@reduxPage";
import {
  Layout,
  LoanStep,
  LoanTip,
  LoanFormOne,
  LoanFormTwo,
  LoanFormThree
} from "@components";

@reduxPage
@connect(
  ({ user, userOther }) => ({ user, userOther }),
  {
    getUser,
    getUserOther
  }
)
export default class extends Component {
  state = {
    steps: ["基本信息", "其他信息", "申请成功"],
    tips: [
      {
        ico: "smile-o",
        text: "您好，请您如实填写您的信息，离您贷款成功只差一步！"
      },
      {
        ico: "check-circle-o",
        text: "您已完成基本信息，请您填写其他信息！"
      },
      {
        ico: "check-circle-o",
        text: "恭喜您已成功提交贷款申请！",
        textClass: "c-main"
      }
    ],
    isLoading: false,
    focus: 0
  };
  componentWillMount() {
    const { url: { query, replace } } = this.props
    if (!query || !query.mobile) {
      replace({ pathname: "/index" }, "/")
    }
  }
  componentDidMount() {
    const { getUser, getUserOther } = this.props;
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
                message.error(response.msg || "抱歉，请求出错。");
              }
            })
            .catch(() => {
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
  onNextOne = param => {
    this.goNext("base", param, 1);
  };
  onNextTwo = param => {
    this.goNext("other", param, 2)
  }
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
    const { steps, tips, focus, isLoading } = this.state;
    const { url: { query }, user, userOther } = this.props;
    return (
      <Layout title="快速申请贷款" className="bg-body">
        {/* banner */}
        <div
          style={{ height: "480px" }}
          className="flex jc-center loan-apply-bg"
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, .5)",
              width: "500px",
              height: "240px",
              marginTop: "75px"
            }}
            className="loan-apply-con-bg flex ai-center jc-center column"
          >
            <div className="font46 bold c333 mb20">快速申请贷款</div>
            <div className="font20">
              QUICK&nbsp;&nbsp;APPLICATION&nbsp;&nbsp;FOR&nbsp;&nbsp;LOAN
            </div>
          </div>
        </div>
        {/* 主体 */}
        <div
          style={{ marginTop: "-90px" }}
          className="box bg-white loan-apply-shdow"
        >
          <div className="h40" />
          <div style={{ margin: "0 100px 30px" }} className="flex">
            {steps.map((item, index) => (
              <LoanStep key={uuid()} index={index} focus={focus} text={item} />
            ))}
          </div>
          <div style={{ margin: "0 60px" }}>
            <LoanTip {...tips[focus]} />
          </div>
          <div className="h40" />
          {/* 第一步，基本信息 */}
          {focus === 0 &&
            user &&
            query && (
              <LoanFormOne
                initName={query.name}
                initMobile={query.mobile}
                initMoney={query.money}
                initGenre={query.genre}
                initSex={user.sex}
                initLimit={user.timelimit}
                initPurpose={user.purpose}
                initCycle={user.cycle}
                initMarry={user.marital_status}
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
          {focus === 2 && <LoanFormThree />}
        </div>
        <div className="h60" />
      </Layout>
    );
  }
}

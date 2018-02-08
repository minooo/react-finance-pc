import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import { message } from "antd";
import { http } from "@utils";
import { getUser } from "@actions";
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
@connect(({ user }) => ({ user }), { getUser })
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
    focus: 0
  };
  componentDidMount() {
    // const { url: { replace, query }, getUser } = this.props;
    const { getUser } = this.props;
    // if (!query) { replace({ pathname: "/index" }, "/") }
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
  render() {
    const { steps, tips, focus } = this.state;
    const { url: { query }, user } = this.props;
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
          {focus === 0 && user && (
            <LoanFormOne
              initName={query && query.name}
              initMobile={query && query.mobile}
              initMoney={query && query.money}
              initGenre={query && query.genre}
              initSex={user.sex}
              initLimit={user.timelimit}
              initPurpose={user.purpose}
              initCycle={user.cycle}
              initMarry={user.marital_status}
              initProvince={user.province}
            />
          )}
          {focus === 1 && <LoanFormTwo />}
          {focus === 2 && <LoanFormThree />}
        </div>
        <div className="h60" />
      </Layout>
    );
  }
}

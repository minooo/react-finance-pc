import React, { Component } from "react";
import uuid from "uuid/v4";
import { Icon } from "antd";
import { Layout, Btn, WrapLink, HomeForm } from "@components";

export default class extends Component {
  state = {
    tabFocus: 0,
    tabTypes: [
      {
        title: "同城贷",
        ico: "loan-tab-one",
        icoActive: "loan-tab-one-active"
      },
      { title: "极速贷", ico: "loan-tab-two", icoActive: "loan-tab-two-active" }
    ],
  };
  onSwitchLoan = index => {
    this.setState({ tabFocus: index });
  };
  render() {
    const { tabFocus, tabTypes } = this.state;
    return (
      <Layout title="贷款超市" style={{ backgroundColor: "#f8f8f8" }}>
        <div style={{ height: "300px", backgroundColor: "#6bb0ff" }}>
          <div
            style={{ backgroundColor: "#6bb0ff" }}
            className="box h-100 loan-banner-bg"
          />
        </div>
        <div style={{ marginTop: "-134px" }} className="box">
          <div className="flex ai-end">
            {tabTypes.map((item, index) => (
              <Btn
                key={uuid()}
                ver
                style={{ width: "300px", borderRadius: "10px 10px 0 0" }}
                btnClass={`${
                  tabFocus === index ? "bg-white h64" : "bg-main h50"
                } mr10`}
                con={
                  <div
                    className={`${
                      tabFocus === index
                        ? `${item.icoActive} c-main`
                        : `${item.ico} c-white`
                    } pl30 font24`}
                  >
                    {item.title}
                  </div>
                }
                onClick={() => this.onSwitchLoan(index)}
              />
            ))}
          </div>
          <div className="bg-white">
            <div className="h70 flex ai-center plr20">
              <WrapLink href="/" as="/" className="c333 font16">
                首页
              </WrapLink>
              <Icon type="right" className="plr5" />
              <span className="c999 font16">贷款超市</span>
            </div>
            <div className="flex plr20">
              <div className="equal plr20">
123
              </div>
              <div
                style={{ width: "290px" }}
                className="ml20 plr20 pb20 loan-border"
              >
                <HomeForm />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

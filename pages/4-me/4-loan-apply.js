import React, { Component } from "react";
import uuid from "uuid/v4";
import { message, Pagination } from "antd";
import { MeSelection, MeloanApplyList, MeLoanAlert, NoData } from "@components";
import { getCookie, http } from "@utils";
import Router from "next/router";

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { pathname } = ctx;
    return { pathname };
  }
  state = {
    detailed: {},
    visible: false,
    currentPage: 1,
    lists: []
  };
  componentDidMount() {
    const token = getCookie("token");
    if (token) {
      this.fetchData(this.state.currentPage);
    } else {
      Router.replace({ pathname: "/4-me/1-login" }, "/login");
      message.error("你还未登录");
    }
  }
  onPageChange = page => {
    this.setState(
      () => ({
        currentPage: page
      }),
      () => {
        const { currentPage } = this.state;
        this.fetchData(currentPage);
      }
    );
  };
  fetchData = page => {
    http
      .get("member/apply_loan_log", { page })
      .then(response => {
        if (response.code === 200 && response.success) {
          const { data } = response;
          this.setState(() => ({
            lists: data.lists
          }));
        } else {
          message.error("抱歉，网络异常，请稍后再试！");
        }
      })
      .catch(() => {
        message.error("抱歉，网络异常，请稍后再试！");
      });
  };
  showModal = data => {
    this.setState(() => ({
      visible: true,
      detailed: data
    }));
  };
  closeModal = () => {
    this.setState(() => ({
      visible: false
    }));
  };
  render() {
    const { pathname } = this.props;
    const { visible, lists, detailed, currentPage } = this.state;
    return (
      <MeSelection pathname={pathname}>
        {/* 先判断有无数据 */}
        {lists && lists.list && lists.list.length > 0 ? (
          <div
            className="w-100 h-100 pb30"
            style={{
              paddingTop: "50px",
              paddingLeft: "45px"
            }}
          >
            <div style={{ width: "920px" }}>
              {/* 题头 */}
              <div
                className="h66 pl20 flex ai-center font16 c333"
                style={{ backgroundColor: "#edf2f8" }}
              >
                <div style={{ width: "200px" }}>申请产品</div>
                <div style={{ width: "155px" }}>贷款金额</div>
                <div style={{ width: "260px" }}>贷款时间</div>
                <div style={{ width: "190px" }}>申请状态</div>
                <div className="equal">操作</div>
              </div>
              {lists.list.map((item, index) => (
                <MeloanApplyList
                  showModal={this.showModal}
                  index={index}
                  item={item}
                  key={uuid()}
                />
              ))}
              <div className="pb30 flex jc-center">
                <Pagination
                  hideOnSinglePage
                  className="pt30"
                  current={currentPage}
                  defaultPageSize={10}
                  total={lists && lists.count ? lists && lists.count : 1}
                  onChange={this.onPageChange}
                />
              </div>
            </div>

            {/* 弹出框 */}
            {visible && (
              <MeLoanAlert closeModal={this.closeModal} detailed={detailed} />
            )}
          </div>
        ) : (
          <NoData caption="你没有贷款申请记录" />
        )}
      </MeSelection>
    );
  }
}

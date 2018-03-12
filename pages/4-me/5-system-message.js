import React, { Component } from "react";
import { Pagination, message } from "antd";
import Router from "next/router";
import uuid from "uuid/v4";
import { MeMessageList, MeSelection, NoData } from "@components";
import { http, getCookie } from "@utils";

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { pathname } = ctx;
    return { pathname };
  }
  state = {
    isFetch: false,
    lists: null,
    currentPage: 1
  };
  componentDidMount() {
    const token = getCookie("token");
    if (token) {
      this.onMessageData();
    } else {
      message.error("没有登录请登录");
      Router.replace({ pathname: "/4-me/1-login" }, "/login");
    }
  }
  // 获取信息
  onMessageData = currentPage => {
    http
      .get("member/notify", { type: 1, page: currentPage })
      .then(response => {
        if (response.code === 200 && response.success) {
          const { lists } = response.data;
          this.setState(() => ({
            isFetch: false,
            lists
          }));
        } else {
          message.error(response.msg || "抱歉，请求出错。");
        }
      })
      .catch(() => {
        message.error("抱歉，网络异常，请稍后再试！");
      });
  };
  // 分页
  onPageChange = page => {
    this.setState(
      () => ({
        isFetch: true,
        currentPage: page
      }),
      () => {
        const { currentPage } = this.state;
        this.onMessageData(currentPage);
      }
    );
  };
  // 删除信息
  onDeletemessages = id => {
    this.setState(() => ({
      isFetch: true
    }));
    http
      .delete(`member/notify/${id}`, null)
      .then(response => {
        // 这里的判断条件根据具体的接口情况而调整
        if (response.code === 200 && response.success) {
          message.success("系统消息删除成功");
          this.setState(() => ({
            currentPage: 1
          }));
          this.onMessageData();
        } else {
          message.error(
            response.msg ? response.msg : "抱歉，请求异常，请稍后再试！"
          );
        }
      })
      .catch(err => {
        message.error("网络错误，请稍后再试！");
        console.info(err);
      });
  };
  render() {
    const { pathname } = this.props;
    const { lists, isFetch, currentPage } = this.state;
    return (
      <MeSelection pathname={pathname} isFetch={isFetch}>
        {lists && lists.list.length > 0 ? (
          <div style={{ padding: "50px" }}>
            {lists.list.map(item => (
              <MeMessageList
                key={uuid()}
                item={item}
                onDeletemessages={this.onDeletemessages}
              />
            ))}
            <div className="flex jc-center">
              <Pagination
                hideOnSinglePage
                className="pt30"
                current={currentPage}
                defaultPageSize={10}
                total={lists.count}
                onChange={this.onPageChange}
              />
            </div>
          </div>
        ) : (
          <NoData caption="暂时没有系统消息" />
        )}
      </MeSelection>
    );
  }
}

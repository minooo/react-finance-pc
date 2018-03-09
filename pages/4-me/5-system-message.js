import React, { Component } from "react";
import { message } from "antd";
import Router from "next/router";
import { MeMessageList, MeSelection, NoData, LoadingFetch } from "@components";
import { http } from "@utils";

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { pathname } = ctx;
    return { pathname };
  }
  state = {
    isFetch: false,
    system: null
  };
  componentDidMount() {
    this.onMessageData();
  }
  onMessageData = () => {
    http
      .get("member/notify")
      .then(response => {
        if (response.code === 200 && response.success) {
          const { system } = response.data;
          this.setState(() => ({ system }));
        } else {
          Router.replace({ pathname: "/4-me/1-login" }, "/login");
        }
      })
      .catch(() => {
        Router.replace({ pathname: "/4-me/1-login" }, "/login");
        message.error("抱歉，网络异常，请稍后再试！");
      });
  };
  onDeletemessages = id => {
    this.setState(() => ({
      isFetch: true
    }));
    http
      .delete(`member/notify/${id}`, null)
      .then(response => {
        // 这里的判断条件根据具体的接口情况而调整
        if (response.code === 200 && response.success) {
          this.setState(() => ({ isFetch: false }));
          message.success("系统消息删除成功");
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
    const { isFetch, system } = this.state;
    return (
      <MeSelection pathname={pathname}>
        {isFetch && <LoadingFetch />}
        {system && system.length > 0 ? (
          <MeMessageList
            message={system}
            onDeletemessages={this.onDeletemessages}
          />
        ) : (
          <NoData caption="暂时没有系统消息" />
        )}
      </MeSelection>
    );
  }
}

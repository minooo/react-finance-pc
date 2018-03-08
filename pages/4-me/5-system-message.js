import React, { Component } from "react";
import { message } from "antd";
import Router from "next/router";
import { MeMessageList, MeSelection, NoData } from "@components";
import { http } from "@utils";

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { pathname } = ctx;
    return { pathname };
  }
  state = {
    messageData: null
  };
  componentDidMount() {
    this.onMessageData();
  }
  onMessageData = () => {
    http
      .get("member/message")
      .then(response => {
        if (response.code === 200 && response.success) {
          // const { messageData } = response.data;
          // this.setState(() => ({ messageData }));
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
    /* eslint-disable */
    console.log(id);
    /* eslint-enable */
  };
  render() {
    const { pathname } = this.props;
    const { messageData } = this.state;
    return (
      <MeSelection pathname={pathname}>
        {messageData && messageData.length > 0 ? (
          <MeMessageList
            message={messageData}
            onDeletemessages={this.onDeletemessages}
          />
        ) : (
          <NoData caption="暂时没有系统消息" />
        )}
      </MeSelection>
    );
  }
}

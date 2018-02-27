import React, { Component } from "react";
import { MeMessageList, MeSelection, NoData } from "@components";
import { message } from "antd";
import { http } from "@utils";

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { pathname } = ctx;
    return { pathname };
  }
  state = {
    message: null
  };
  componentDidMount() {
    this.onMessageData();
  }
  onMessageData = () => {
    http
      .get("member/message")
      .then(response => {
        if (response.code === 200 && response.success) {
          const { message } = response.data;
          this.setState(() => ({ message }));
        }
      })
      .catch(err => {
        message.error("网络错误，请稍后再试！");
        console.info(err);
      });
  };
  onDeletemessages = id => {
    /* eslint-disable */
    console.log(id);
    /* eslint-enable */
  };
  render() {
    const { pathname } = this.props;
    const { message } = this.state;
    return (
      <MeSelection pathname={pathname}>
        {message && message.length > 0 ? (
          <MeMessageList message={message} />
        ) : (
          <NoData caption="没有申请消息" />
        )}
      </MeSelection>
    );
  }
}

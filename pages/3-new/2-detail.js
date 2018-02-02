import React, { Component } from "react";
import { Layout } from "@components";
import { Icon } from "antd";

export default class extends Component {
  static getInitialProps({ query: { id } }) {
    return { id };
  }
  state = {};
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=408841";
    document.body.appendChild(script);
  }
  render() {
    const html = "<p>哈罗，世界</p>"
    const { id } = this.props
    return (
      <Layout title="资讯详情">
        <div>资讯详情{id}</div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <div className="bdsharebuttonbox">
          <a href="https://www.baidu.com/" className="bds_qzone h30 w30 block" data-cmd="qzone" title="分享到QQ空间"><Icon type="link" /></a>
          <a href="https://www.baidu.com/" className="bds_weixin" data-cmd="weixin" title="分享到微信">{null}</a>
        <a href="https://www.baidu.com/" className="bds_tsina" data-cmd="tsina" title="分享到新浪微博">{null}</a>
        </div>
      </Layout>
    )
  }
}

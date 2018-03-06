import React, { Component } from "react";
import { BackTop, Icon } from "antd";
import { WrapLink } from "@components";

export default class extends Component {
  state = {
    show: false,
    qqEnter: false,
    topEnter: false
  };
  componentDidMount() {
    window.onscroll = () => this.handleScroll();
  }
  handleScroll = () => {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollTop > 600) {
      this.setState({
        show: true
      });
    } else {
      this.setState({
        show: false
      });
    }
  };
  isQQEnter = () => {
    this.setState(pre => ({
      qqEnter: !pre.qqEnter
    }));
  };
  isTopEnter = () => {
    this.setState(pre => ({
      topEnter: !pre.topEnter
    }));
  };
  render() {
    const { show, qqEnter, topEnter } = this.state;
    return (
      <div
        style={{
          position: "fixed",
          bottom: " 260px",
          right: "40px",
          zIndex: "1000"
        }}
      >
        <div
          className={`flex column js-between w40 ${
            show ? "visible" : "hidden"
          }`}
        >
          <WrapLink
            onMouseEnter={this.isQQEnter}
            onMouseLeave={this.isQQEnter}
            className="flex w40 h40 wrap jc-center ai-center backtop-hover backtop-item pointer"
            href="tencent://message/?uin=2712219568&amp;Site=sc.chinaz.com&amp;Menu=yes"
          >
            {qqEnter ? (
              <div className="w40 h40 font12 lh100" style={{ padding: "8px" }}>
                咨询客服
              </div>
            ) : (
              <div className="block back-top-qq" />
            )}
          </WrapLink>
          <BackTop
            visibilityHeight="1"
            className="w40 h40 flex jc-center ai-center backtop-hover backtop-item pointer"
            onMouseEnter={this.isTopEnter}
            onMouseLeave={this.isTopEnter}
          >
            {topEnter ? (
              <div className="w40 h40 font12 lh100" style={{ padding: "8px" }}>
                返回顶部
              </div>
            ) : (
              <Icon type="up" style={{ fontSize: 22 }} />
            )}
          </BackTop>
        </div>
      </div>
    );
  }
}

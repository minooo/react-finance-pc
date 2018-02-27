import React, { Component } from "react";
import { BackTop, Icon } from "antd";
import { WrapLink } from "@components";

export default class extends Component {
  state = {
    show: false,
    qqEnter: false,
    qrcodeEnter: false,
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
    if (scrollTop > 400) {
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
  isQrcodeEnter = () => {
    this.setState(pre => ({
      qrcodeEnter: !pre.qrcodeEnter
    }));
  };
  isTopEnter = () => {
    this.setState(pre => ({
      topEnter: !pre.topEnter
    }));
  };
  render() {
    const { show, qqEnter, qrcodeEnter, topEnter } = this.state;
    return (
      <div style={{ position: "fixed", bottom: " 260px", right: "40px" }}>
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
              <Icon className="block" type="qq" style={{ fontSize: 22 }} />
            )}
          </WrapLink>
          <div
            className="w40 h40 flex jc-center ai-center backtop-hover backtop-item pointer relative"
            onMouseEnter={this.isQrcodeEnter}
            onMouseLeave={this.isQrcodeEnter}
          >
            {qrcodeEnter ? (
              <div className="w40 h40 font12 lh100" style={{ padding: "8px" }}>
                扫码关注
              </div>
            ) : (
              <Icon type="qrcode" style={{ fontSize: 22 }} />
            )}
            {qrcodeEnter && (
              <div
                className="absolute home-shdow-sm bg-white qrcode-triangle"
                style={{ width: "205px", height: "245px", right: "60px" }}
              >
                <div
                  className="code-bg"
                  style={{ width: "205px", height: "205px" }}
                />
                <div className="text-center font18 c333">
                  嘟嘟e金融公众微信号
                </div>
              </div>
            )}
          </div>
          <BackTop
            visibilityHeight="100"
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

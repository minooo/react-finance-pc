import React, { Component } from "react";
import { Input, Button, Radio, message } from "antd";
import { Layout, WrapLink } from "@components";

export default class extends Component {
  state = {
    mobile: null,
    code: null,
    tickNum: 60,
    isSendCode: true
  };
  render() {
    const { mobile, code, tickNum, isSendCode } = this.state;
    const { Search } = Input;
    return (
      <Layout footNoShow title="登陆">
        {/* banner图 */}
        <div
          style={{
            height: "600px"
          }}
          className="me-login-banner"
        >
          <div
            style={{
              height: "600px"
            }}
            className="box relative"
          >
            <div
              style={{
                width: "320px",
                height: "385px",
                top: "80px",
                right: "0px"
              }}
              className=" bg-white plr30 absolute"
            >
              <div className="font22 c333 lh100 ptb30 text-center">登录</div>
              <Input
                placeholder="请输入手机号"
                size="large"
                autoFocus
                className="mb10"
                value={mobile}
                maxLength="11"
                onChange={val => this.onChange(val, "mobile")}
              />
              <div className="mb10 flex">
                <Input className="equal" placeholder="图片验证码" size="large" />
                <div style={{ width: "116px", height: "40px" }} className="img-bg">
                  <img className="w-100 h-100" src="http://192.168.1.116/web/auth/captcha" alt="" />
                </div>
              </div>
              <Search
                placeholder="请输入验证码"
                enterButton={
                  isSendCode ? "获取手机验证码" : `${tickNum}秒后重新获取`
                }
                size="large"
                className={`${isSendCode ? "" : "home-sendcode-disable"} mb20`}
                value={code}
                maxLength="6"
              />
              <Radio>七天免登录</Radio>
              <Button
                type="primary"
                className="h40 font16 w-100 mt25 mb25"
                onClick={this.applyLoan}
              >
                登录
              </Button>
              <p className="font14 lh100 c999 text-center">动态验证码登录即可无需注册</p>
            </div>
          </div>
        </div>
        <div className="h100 pt25">
          <div className="font14 lh100 flex c-white jc-center">
            <WrapLink
              href="/about"
              as="/about"
              className=" c333 plr10 border-right"
            >
              关于我们
            </WrapLink>
            <WrapLink
              href="/about"
              as="/about"
              className="plr10 border-right c333"
            >
              联系我们
            </WrapLink>
            <WrapLink
              href="/about"
              as="/about"
              className="plr10 border-right c333"
            >
              信贷经理入驻
            </WrapLink>
            <WrapLink href="/about" as="/about" className="pl10 c333">
              信贷经理登录
            </WrapLink>
          </div>
          <div className="font12 mt15 c333 w-100 text-center">
            Copyright&nbsp;2018&nbsp;&nbsp;河南晨隆金融服务有限公司&nbsp;&nbsp;版权所有&nbsp;&nbsp;豫ICP备13439999号-2
          </div>
        </div>
      </Layout>
    );
  }
}

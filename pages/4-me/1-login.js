import React, { Component } from "react";
import { Input, Button, Checkbox, message } from "antd";
import { Layout, WrapLink } from "@components";
import { http, isMobile } from "@utils";

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { isServer } = ctx;
    return { isServer };
  }
  state = {
    logCode: null,
    mobile: null,
    captcha: null,
    code: null,
    tickNum: 60,
    isSendCode: true
  };
  componentDidMount() {
    this.onImgCode();
  }
  componentWillUnmount() {
    clearInterval(this.tick);
  }
  // 获取图形验证码
  onImgCode = () => {
    http
      .get("/auth/captcha")
      .then(response => {
        // 这里的判断条件根据具体的接口情况而调整
        const logCode = response;
        this.setState(() => ({ logCode }));
      })
      .catch(err => {
        message.error("网络错误，请稍后再试！");
        console.info(err);
      });
  };
  // 获取输入数据
  onChange = (val, type) => {
    if (type === "captcha" || type === "code") {
      const { value } = val.target;
      this.setState(() => ({ [type]: value }));
    }
    if (type === "mobile") {
      const { value } = val.target;
      const reg = /^([1-9][0-9]*)?$/;
      if (reg.test(value)) {
        this.setState(() => ({ [type]: value }));
      }
    }
  };
  // 发送手机验证码
  onSendCode = () => {
    const { mobile, isSendCode } = this.state;
    if (!isSendCode) return;
    if (!isMobile(mobile)) {
      message.error("您的手机号格式有误，请检查。");
      return;
    }
    this.setState(
      () => ({ tickNum: 60, isSendCode: false }),
      () => {
        // 发送验证码接口调用
        http
          .post("auth/send_code", { phone: mobile })
          .then(response => {
            // 这里的判断条件根据具体的接口情况而调整
            if (response.code === 200 && response.success) {
              message.success("手机验证码发送成功");
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
        this.tick = setInterval(() => {
          this.setState(
            pre => ({ tickNum: pre.tickNum - 1 }),
            () => {
              if (this.state.tickNum === 0) {
                this.setState(() => ({ tickNum: 60, isSendCode: true }));
                clearInterval(this.tick);
              }
            }
          );
        }, 1000);
      }
    );
  };
  // 登录
  applyLoan = () => {
    const { mobile, captcha, code } = this.state;
    if (!isMobile(mobile)) {
      message.error("您的手机号格式有误，请检查。");
      return;
    }
    if (!captcha) {
      message.error("请输入的图形验证码。");
      return;
    }
    if (!code) {
      message.error("请输入您的验证码。");
      return;
    }
    http
      .post("/auth/sign", { mobile, code, captcha })
      .then(response => {
        // 这里的判断条件根据具体的接口情况而调整
        if (response.code === 200 && response.success) {
          message.success("登录成功");
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
    const { logCode, mobile, captcha, code, tickNum, isSendCode } = this.state;
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
                placeholder="请输入手机号码"
                size="large"
                autoFocus
                className="mb10"
                value={mobile}
                maxLength="11"
                onChange={val => this.onChange(val, "mobile")}
              />
              <div className="mb10 flex">
                <Input
                  className="equal"
                  placeholder="图片验证码"
                  size="large"
                  maxLength="6"
                  value={captcha}
                  onChange={val => this.onChange(val, "captcha")}
                />
                <div
                  style={{ width: "117px" }}
                  className="img-bg h40 login-img-code"
                >
                  <img className="w-100 h-100" src={logCode} alt="" />
                </div>
              </div>
              <Search
                placeholder="手机验证码"
                enterButton={
                  isSendCode ? "获取手机验证码" : `${tickNum}秒后重新获取`
                }
                size="large"
                className={`${isSendCode ? "" : "home-sendcode-disable"} mb20`}
                value={code}
                maxLength="6"
                onChange={val => this.onChange(val, "code")}
                onSearch={this.onSendCode}
              />
              <Checkbox className=" c999 font14 ">七天免登录</Checkbox>
              <Button
                type="primary"
                className="h40 font16 w-100 mt25 mb25"
                onClick={this.applyLoan}
              >
                登录
              </Button>
              <p className="font14 lh100 c999 text-center">
                动态验证码登录即可无需注册
              </p>
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

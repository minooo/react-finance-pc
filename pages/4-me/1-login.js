import React, { Component } from "react";
import Router from "next/router";
import { Input, Button, Checkbox, message, Alert } from "antd";
import { Layout, WrapLink, Btn } from "@components";
import { http, isMobile, setCookie, cache } from "@utils";

export default class extends Component {
  state = {
    tickNum: 60,
    isLoading: false,
    isSendCode: true,
    isLongLogin: true
  };
  componentDidMount() {
    this.onImgCode();
  }
  componentWillUnmount() {
    clearInterval(this.tick);
  }
  onClose = () => {
    this.onErrMsg();
  };
  onErrMsg = msg => {
    this.setState(() => ({ errMsg: msg }));
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
    if (type === "login") {
      const { checked } = val.target;
      this.setState(() => ({ isLongLogin: checked }));
    }
  };
  // 获取图形验证码
  onImgCode = () => {
    http
      .callApi("auth/captcha", "get", null, null, { responseType: "blob" })
      .then(response => {
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(response);
        this.setState(() => ({ logCode: imageUrl }));
      })
      .catch(err => {
        message.error("网络错误，请稍后再试！");
        console.info(err);
      });
  };
  // 获取手机验证码
  onSendCode = async () => {
    const { mobile, isSendCode, captcha } = this.state;
    if (!isSendCode) return;
    if (!isMobile(mobile)) {
      this.onErrMsg("您的手机号格式有误，请检查。");
      return;
    }
    if (!captcha) {
      this.onErrMsg("请输入图形验证码。");
      return;
    }

    this.setState(
      () => ({ tickNum: 60, isSendCode: false }),
      () => {
        http.post("auth/check_captcha", { captcha }).then(response => {
          if (response.code === 200 && response.success) {
            // 发送验证码接口调用
            http
              .post("auth/send_code", { phone: mobile })
              .then(response => {
                if (response.code === 200 && response.success) {
                  message.success("手机验证码发送成功。");
                } else {
                  message.error(response.msg || "抱歉，请求异常，请稍后再试！");
                }
              })
              .catch(err => {
                message.error("网络错误，请稍后再试！");
                console.info(err);
              });
          } else {
            this.onErrMsg(response.msg || "图片验证码有误，请检查。");
            this.setState(() => ({ tickNum: 60, isSendCode: true }));
            clearInterval(this.tick);
          }

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
        });
      }
    );
  };
  // 登录
  applyLoan = () => {
    const { mobile, captcha, code, isLongLogin } = this.state;
    const { url: { query } } = this.props;

    if (!isMobile(mobile)) {
      this.onErrMsg("您的手机号格式有误，请检查。");
      return;
    }
    if (!captcha) {
      this.onErrMsg("请输入图形验证码。");
      return;
    }
    if (!code) {
      this.onErrMsg("请输入手机验证码。");
      return;
    }
    this.setState(
      () => ({ isLoading: true }),
      () => {
        http
          .post("/auth/sign", { phone: mobile, code, captcha })
          .then(response => {
            this.setState(() => ({ isLoading: false }));
            if (response.code === 200 && response.success) {
              const { token } = response.data;
              const time = isLongLogin ? 29 : 1;
              setCookie("token", token, time);
              cache.setItem("userPhone", mobile);
              Router.push(
                { pathname: (query && query.href) || "/4-me/2-home", query },
                (query && query.as) || "/me"
              );
            } else {
              message.error(response.msg || "抱歉，请求异常，请稍后再试！");
            }
          })
          .catch(err => {
            message.error("网络错误，请稍后再试！");
            console.info(err);
          });
      }
    );
  };
  render() {
    const {
      logCode,
      mobile,
      captcha,
      code,
      tickNum,
      isSendCode,
      errMsg,
      isLoading,
      isLongLogin
    } = this.state;
    const { Search } = Input;
    return (
      <Layout footNoShow title="登录">
        {/* banner图 */}
        <div style={{ height: "600px" }} className="me-login-banner">
          <div style={{ height: "600px" }} className="box relative">
            <div
              style={{
                width: "320px",
                top: "80px",
                right: "0px"
              }}
              className="bg-white plr30 absolute"
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
              <div className="mb10 relative">
                <Input
                  placeholder="图片验证码"
                  size="large"
                  maxLength="6"
                  value={captcha}
                  onChange={val => this.onChange(val, "captcha")}
                />
                <Btn
                  style={{ width: "130px" }}
                  className="img-bg h38 login-img-code"
                  con={
                    <img
                      style={{ width: "130px" }}
                      className="h-100 block"
                      src={logCode}
                      alt=""
                    />
                  }
                  onClick={this.onImgCode}
                />
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
              <Checkbox
                className="c999 font14 mb25"
                checked={isLongLogin}
                onChange={val => this.onChange(val, "login")}
              >
                七天免登录
              </Checkbox>
              {errMsg && (
                <Alert
                  message={errMsg}
                  type="error"
                  showIcon
                  closable
                  className="mb10"
                  onClose={this.onClose}
                />
              )}
              <Button
                loading={isLoading}
                type="primary"
                className="h40 font16 w-100 mb25"
                onClick={this.applyLoan}
              >
                登录
              </Button>
              <p className="font14 lh100 c999 text-center pb20">
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

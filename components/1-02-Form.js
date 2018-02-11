import React, { Component, Fragment } from "react";
import { Input, Select, Button, message, Alert } from "antd";
import { withRouter } from "next/router";
import { isMobile, isName, http, setCookie } from "@utils";

@withRouter
export default class extends Component {
  state = {
    name: null,
    money: null,
    genre: null,
    mobile: null,
    code: null,
    tickNum: 60,
    isLoading: false,
    isSendCode: true
  };
  componentWillUnmount() {
    clearInterval(this.tick);
  }
  onChange = (val, type) => {
    if (type === "name" || type === "code") {
      const { value } = val.target;
      this.setState(() => ({ [type]: value }));
    }
    if (type === "money" || type === "mobile") {
      const { value } = val.target;
      const reg = /^([1-9][0-9]*)?$/;
      if (reg.test(value)) {
        this.setState(() => ({ [type]: value }));
      }
    }
    if (type === "genre") {
      this.setState(() => ({ [type]: val }));
    }
  };
  onSendCode = () => {
    const { mobile, isSendCode } = this.state;
    if (!isSendCode) return;
    if (!isMobile(mobile)) {
      this.onErrMsg("您的手机号格式有误，请检查。")
      return;
    }
    this.setState(
      () => ({ tickNum: 60, isSendCode: false }),
      () => {
        // 发送验证码接口调用
        http.post("auth/send_code", { phone: mobile }).then(response => {
          if (response.code === 200 && response.success) {
            message.success("验证码发送成功！")
          } else {
            message.error(response.msg || "抱歉，请求出错。")
          }
        }).catch(() => { message.error("抱歉，网络异常，请稍后再试！") })

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
  onClose = () => {
    this.onErrMsg()
  }
  onErrMsg = (msg) => {
    this.setState(() => ({ errMsg: msg }))
  }
  applyLoan = () => {
    const { name, money, mobile, genre, code } = this.state;
    const { router } = this.props
    if (!isName(name)) {
      this.onErrMsg("请输入您的姓名，2-4字")
      return;
    }
    if (!money) {
      this.onErrMsg("请输入您的贷款金额")
      return;
    }
    if (!genre) {
      this.onErrMsg("请选择您的贷款类型。")
      return;
    }
    if (!isMobile(mobile)) {
      this.onErrMsg("您的手机号格式有误，请检查。")
      return;
    }
    if (!code) {
      this.onErrMsg("请输入您的验证码。")
      return;
    }
    this.setState(() => ({ isLoading: true }), () => {
      http.post("loans/fast_apply", { name, money, genre, phone: mobile, code }).then(response => {
        this.setState(() => ({ isLoading: false }))
        if (response.code === 200 && response.success) {
          const { token } = response.data
          setCookie("token", token)
          router.push({ pathname: "/1-loan/4-apply-loan", query: { name, money, mobile, genre } }, "/loan/apply")
        } else {
          this.onErrMsg(response.msg || "抱歉，请求出错。")
        }
      }).catch(() => { message.error("抱歉，网络异常，请稍后再试！") })
    })
  };
  render() {
    const { name, money, mobile, code, tickNum, isSendCode, isLoading, errMsg } = this.state;
    const { Option } = Select;
    const { Search } = Input;
    return (
      <Fragment>
        <div className="font22 c333 ptb20 text-center">快速申请贷款</div>
        <Input
          placeholder="请输入姓名"
          size="large"
          className="mb10"
          value={name}
          maxLength="4"
          onChange={val => this.onChange(val, "name")}
        />
        <Input
          placeholder="请输入贷款金额"
          size="large"
          addonAfter="元"
          value={money}
          maxLength="8"
          onChange={val => this.onChange(val, "money")}
        />
        <Select
          placeholder="请选择贷款类型"
          className="w-100 mb10 mt10"
          size="large"
          onChange={val => this.onChange(val, "genre")}
        >
          <Option value="房产贷款">房产贷款</Option>
          <Option value="车辆贷款">车辆贷款</Option>
          <Option value="信用贷款">信用贷款</Option>
          <Option value="其他贷款">其他贷款</Option>
        </Select>
        <Input
          placeholder="请输入手机号"
          size="large"
          className="mb10"
          value={mobile}
          maxLength="11"
          onChange={val => this.onChange(val, "mobile")}
        />
        <Search
          placeholder="请输入验证码"
          enterButton={isSendCode ? "获取手机验证码" : `${tickNum}秒后重新获取`}
          size="large"
          className={`${isSendCode ? "" : "home-sendcode-disable"} mb20`}
          value={code}
          maxLength="6"
          onChange={val => this.onChange(val, "code")}
          onSearch={this.onSendCode}
        />
        {errMsg && <Alert message={errMsg} type="error" showIcon closable className="mb10" onClose={this.onClose} />}
        <Button
          type="primary"
          loading={isLoading}
          className="h40 font16 w-100"
          onClick={this.applyLoan}
        >
          立即申请
        </Button>
      </Fragment>
    );
  }
}

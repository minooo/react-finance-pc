import React, { Component } from "react";
import { Input, Select, Button, message } from "antd";
import { isMobile, isName } from "@utils";

export default class extends Component {
  state = {
    name: null,
    money: null,
    loanType: null,
    mobile: null,
    code: null,
    tickNum: 60,
    isSendCode: true
  };
  componentWillUnmount() {
    clearInterval(this.tick)
  }
  onSwitch = () => {
    this.setState(pre => ({ isOnOver: !pre.isOnOver }));
  };
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
    if (type === "loanType") {
      this.setState(() => ({ [type]: val }));
    }
  };
  onSendCode = () => {
    const { mobile, isSendCode } = this.state;
    if (!isSendCode) return
    if (!isMobile(mobile)) {
      message.error("您的手机号格式有误，请检查。");
      return;
    }
    this.setState(() => ({ tickNum: 60, isSendCode: false }), () => {
      // 发送验证码接口调用

      this.tick = setInterval(() => {
        this.setState(pre => ({ tickNum: pre.tickNum - 1 }), () => {
          if (this.state.tickNum === 0) {
            this.setState(() => ({ tickNum: 60, isSendCode: true }))
            clearInterval(this.tick)
          }
        })
      }, 1000)
    })
  };
  applyLoan = () => {
    const { name, money, mobile, loanType, code } = this.state;
    if (!isName(name)) {
      message.error("请输入您的真实姓名，2-4个汉字");
      return;
    }
    if (!money) {
      message.error("请输入您的贷款金额");
      return;
    }
    if (!loanType) {
      message.error("请选择您的贷款类型。");
      return;
    }
    if (!isMobile(mobile)) {
      message.error("您的手机号格式有误，请检查。");
      return;
    }
    if (!code) {
      message.error("请输入您的验证码。");
      return;
    }
    console.info(name, money, mobile, loanType, code)
  };
  render() {
    const { name, money, mobile, code, tickNum, isSendCode } = this.state;
    const { Option } = Select;
    const { Search } = Input;
    return (
      <div
        style={{ width: "320px", height: "390px" }}
        className="bg-white home-shdow-mid home-form plr30"
      >
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
          maxLength="9"
          onChange={val => this.onChange(val, "money")}
        />
        <Select
          defaultValue="please"
          className="w-100 mb10 mt10"
          size="large"
          onChange={val => this.onChange(val, "loanType")}
        >
          <Option value="please" disabled>
            请选择贷款类型
          </Option>
          <Option value="1">买房</Option>
          <Option value="2">买车</Option>
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
        <Button
          type="primary"
          className="h40 font16 w-100"
          onClick={this.applyLoan}
        >
          立即申请
        </Button>
      </div>
    );
  }
}

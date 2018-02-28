import React, { Component } from "react";
import { Input, Select, Button, Alert } from "antd";
import uuid from "uuid/v4";

export default class extends Component {
  state = {};
  onChange = (val, type) => {
    if (type === "money") {
      const { value } = val.target;
      const reg = type === "idNum" ? /^[a-z0-9]*$/ : /^([1-9][0-9]*)?$/;
      if (reg.test(value)) {
        this.setState(() => ({ [type]: value }));
      }
    }
    if (
      type === "loanType" ||
      type === "loanDate" ||
      type === "loanUse" ||
      type === "needTime"
    ) {
      this.setState(() => ({ [type]: val }));
    }
  };
  onAreaChange = value => {
    this.setState(() => ({ myArea: value }));
  };
  onNextOne = () => {
    const { money, loanType, loanDate, loanUse, needTime } = this.state;
    const { onNextOne } = this.props;
    if (!money) {
      this.onErrMsg("请输入您的贷款金额。");
      return;
    }
    if (!loanType) {
      this.onErrMsg("请选择您的贷款类型。");
      return;
    }
    if (!loanDate) {
      this.onErrMsg("请选择您的贷款期限。");
      return;
    }
    if (!loanUse) {
      this.onErrMsg("请选择您的贷款用途。");
      return;
    }
    if (!needTime) {
      this.onErrMsg("请选择您的需款时间。");
      return;
    }

    const param = {
      money,
      genre: loanType,
      timelimit: loanDate,
      purpose: loanUse,
      cycle: needTime,
      apply_loan_action: 1
    };

    onNextOne(param);
  };
  onClose = () => {
    this.onErrMsg();
  };
  onErrMsg = msg => {
    this.setState(() => ({ errMsg: msg }));
  };
  onMoneyBlur = e => {
    const { initMoneyStart, initMoneyEnd } = this.props;
    const { value } = e.target;
    let finalVal;
    finalVal = +value;
    if (+value > initMoneyEnd) {
      finalVal = +initMoneyEnd;
    }
    if (+value < initMoneyStart) {
      finalVal = +initMoneyStart;
    }
    this.setState(() => ({ money: finalVal }));
  };
  render() {
    const { money, errMsg } = this.state;
    const { Option } = Select;
    const {
      initMoneyStart,
      initMoneyEnd,
      initGenre,
      initLimit,
      initPurpose,
      initCycle,
      isLoading
    } = this.props;
    return (
      <div style={{ marginLeft: "290px" }}>
        {/* 贷款金额 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">贷款金额:</div>
          <div className="w40" />
          <div className="w310">
            <Input
              placeholder={`贷款范围：${initMoneyStart}-${initMoneyEnd}`}
              size="large"
              addonAfter="元"
              value={money}
              maxLength="8"
              onChange={val => this.onChange(val, "money")}
              onBlur={this.onMoneyBlur}
            />
          </div>
        </div>

        {/* 贷款类型 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">贷款类型:</div>
          <div className="w40" />
          <Select
            defaultValue={initGenre}
            className="w310"
            size="large"
            onChange={val => this.onChange(val, "loanType")}
          >
            <Option value="房产贷款">房产贷款</Option>
            <Option value="车辆贷款">车辆贷款</Option>
            <Option value="信用贷款">信用贷款</Option>
            <Option value="其他贷款">其他贷款</Option>
          </Select>
        </div>

        {/* 贷款期限 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">贷款期限:</div>
          <div className="w40" />
          <Select
            placeholder="请选择"
            className="w310"
            size="large"
            onChange={val => this.onChange(val, "loanDate")}
          >
            {initLimit.map(item => (
              <Option key={uuid()} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* 贷款用途 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">贷款用途:</div>
          <div className="w40" />
          <Select
            placeholder="请选择"
            className="w310"
            size="large"
            onChange={val => this.onChange(val, "loanUse")}
          >
            {initPurpose.map(item => (
              <Option key={uuid()} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* 需款时间 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">需款时间:</div>
          <div className="w40" />
          <Select
            placeholder="请选择"
            className="w310"
            size="large"
            onChange={val => this.onChange(val, "needTime")}
          >
            {initCycle.map(item => (
              <Option key={uuid()} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>

        {errMsg && (
          <Alert
            message={errMsg}
            type="error"
            showIcon
            closable
            className="mb10"
            style={{ width: "310px", marginLeft: "130px" }}
            onClose={this.onClose}
          />
        )}
        <Button
          type="primary"
          loading={isLoading}
          className="h40 font16 w220 r2"
          style={{ margin: "0 0 56px 130px" }}
          onClick={this.onNextOne}
        >
          下一步
        </Button>
      </div>
    );
  }
}

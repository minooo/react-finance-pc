import React, { Component } from "react";
import { Select, Button, Input, Radio, Alert } from "antd";
import uuid from "uuid/v4";
import { Btn } from "@components";

export default class extends Component {
  state = {
    assetParam: {}
  };
  onChange = (val, type) => {
    if (type === "credit") {
      const { value } = val.target;
      this.setState(() => ({ [type]: value }));
    }
    if (type !== "incomeWay" && type.indexOf("income") !== -1) {
      // income:月收入 income21:月经营流水  income51:月对公账户收入  income1: 月现金结算流水
      const { value } = val.target;
          const reg = /^([1-9][0-9]*)?$/;
          if (reg.test(value)) {
            this.setState(() => ({ [type]: value }));
          }
    }
    if (type === "job" || type === "incomeWay") {
      this.setState(() => ({ [type]: val }));
    }
  };

  onNextTwo = () => {
    // income:月收入 income21:月经营流水  income51:月对公账户收入  income1: 月现金结算流水
    const {
      job,
      income,
      income21,
      income51,
      income1,
      incomeWay,
      credit,
      assetParam
    } = this.state;
    const { initCredit, onNextTwo, noapply } = this.props;
    let jobParam = {};

    if (!job) {
      this.onErrMsg("请选择您的职业身份。");
      return;
    }
    // 上班族
    if (job === 1) {
      if (!incomeWay) {
        this.onErrMsg("请选择您的收入方式。");
        return;
      }
      if (!income) {
        this.onErrMsg("请输入您的月收入。");
        return;
      }
      jobParam = { income_mode: incomeWay, monthly_income: income };
    }
    // 个体户
    if (job === 2) {
      if (!income21) {
        this.onErrMsg("请输入您的月经营流水。");
        return;
      }
      if (!income1) {
        this.onErrMsg("请填写您的月现金结算流水。");
        return;
      }
      jobParam = {
        monthly_turnover: income21,
        cash_settlement_operating_income: income1
      };
    }
    // 自由职业者
    if (job === 4) {
      if (!income) {
        this.onErrMsg("请填写您的月收入。");
        return;
      }
      jobParam = { monthly_income: income };
    }
    // 企业主
    if (job === 5) {
      if (!income51) {
        this.onErrMsg("请填写您的月对公账户收入");
        return;
      }
      if (!income1) {
        this.onErrMsg("请填写您的月现金结算流水。");
        return;
      }
      jobParam = {
        monthly_business_account_income: income51,
        cash_settlement_operating_income: income1
      };
    }
    const param = {
      identity_status: job,
      ...jobParam,
      credit_condition: credit || initCredit[0].id,
      ...(!noapply && { apply_loan_action: 1 }),
      ...assetParam
    };

    onNextTwo(param);
  };

  onClick = key => {
    this.setState(pre => ({
      assetParam: { ...pre.assetParam, [key]: pre.assetParam[key] ? null : 1 }
    }));
  };
  onClose = () => {
    this.onErrMsg();
  };
  onErrMsg = msg => {
    this.setState(() => ({ errMsg: msg }));
  };

  render() {
    const { errMsg, credit, job } = this.state;
    const {
      initJob,
      initIncomeWay,
      initCredit,
      initAsset,
      isLoading,
      noapply
    } = this.props;
    const { Option } = Select;
    const RadioGroup = Radio.Group;
    return (
      <div style={{ marginLeft: noapply ? "120px" : "290px" }}>
        {/* 职业身份 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w110 text-right">职业身份:</div>
          <div className="w40" />
          <Select
            placeholder="请选择"
            className="w310"
            size="large"
            onChange={val => this.onChange(val, "job")}
          >
            {initJob.map(item => (
              <Option key={uuid()} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* 收入方式 */}
        {job === 1 && (
          <div className="flex ai-center mb30">
            <div className="font14 c333 w110 text-right">收入方式:</div>
            <div className="w40" />
            <Select
              placeholder="请选择"
              className="w310"
              size="large"
              onChange={val => this.onChange(val, "incomeWay")}
            >
              {initIncomeWay.map(item => (
                <Option key={uuid()} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
        )}

        {/* 经营流水/对公账户 */}
        {(job === 2 || job === 5) && (
          <div className="flex ai-center mb30">
            <div className="font14 c333 w110 text-right">
              月{job === 2 ? "经营流水" : "对公账户收入"}:
            </div>
            <div className="w40" />
            <div className="w310">
              <Input
                placeholder="请输入..."
                size="large"
                addonAfter="元"
                value={this.state[`income${job}1`]}
                maxLength="8"
                onChange={val => this.onChange(val, `income${job}1`)}
              />
            </div>
          </div>
        )}

        {/* 月收入 */}
        {job &&
          job !== 3 && (
            <div className="flex ai-center mb30">
              <div className="font14 c333 w110 text-right">
                {job === 1 || job === 4 ? "月收入" : "月现金结算流水"}:
              </div>
              <div className="w40" />
              <div className="w310">
                <Input
                  placeholder="请输入..."
                  size="large"
                  addonAfter="元"
                  value={this.state[`income${job === 1 || job === 4 ? "" : 1}`]}
                  maxLength="8"
                  onChange={val =>
                    this.onChange(
                      val,
                      `income${job === 1 || job === 4 ? "" : 1}`
                    )
                  }
                />
              </div>
            </div>
          )}

        {/* 信用情况 */}
        <div className="flex mb15">
          <div className="font14 c333 w110 text-right equal-no">信用情况:</div>
          <div className="w40 equal-no" />
          <RadioGroup
            onChange={val => this.onChange(val, "credit")}
            value={credit || initCredit[0].id}
            size="large"
            className="flex wrap"
          >
            {initCredit.map(item => (
              <Radio key={uuid()} value={item.id} className="mb15">
                {item.name}
              </Radio>
            ))}
          </RadioGroup>
        </div>

        {/* 资产情况 */}
        <div className="flex mb15">
          <div
            style={{ lineHeight: "38px" }}
            className="font14 c333 w110 text-right"
          >
            资产情况:
          </div>
          <div className="w40" />
          <div style={{ width: "430px" }} className="flex wrap">
            {initAsset.map(item => (
              <Btn
                key={uuid()}
                style={{ lineHeight: "38px" }}
                btnClass={`w100 h38 font14 mr5 mb15 c333 text-overflow-one text-center ${
                  this.state.assetParam[item.key]
                    ? "loan-apply-asset-bg-active"
                    : "loan-apply-border"
                }`}
                con={item.name}
                onClick={() => this.onClick(item.key)}
              />
            ))}
          </div>
        </div>
        {errMsg && (
          <Alert
            message={errMsg}
            type="error"
            showIcon
            closable
            className="mb10"
            style={{ width: "310px", marginLeft: "150px" }}
            onClose={this.onClose}
          />
        )}
        <Button
          type="primary"
          loading={isLoading}
          className="h40 font16 w220 r2"
          style={{ margin: "0 0 56px 150px" }}
          onClick={this.onNextTwo}
        >
          下一步
        </Button>
      </div>
    );
  }
}

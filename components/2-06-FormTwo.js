import React, { Component } from "react";
import { Select, Button, message, Radio } from "antd";
import uuid from "uuid/v4";
import { Btn } from "@components";

export default class extends Component {
  state = {
    loanType: null,
    loanDate: null,
    credits: [
      { key: "hasCar", name: "名下有车" },
      { key: "hasHouse", name: "名下有房" },
      { key: "hasCount", name: "有淘宝账号" },
      { key: "hasCount1", name: "有淘宝账号" },
      { key: "hasCount2", name: "有淘宝账号" },
      { key: "hasCount3", name: "有淘宝账号" }
    ],
    assetParam: {}
  };
  onChange = (val, type) => {
    if (type === "loanType") {
      this.setState(() => ({ [type]: val }));
    }
    if (type === "loanDate") {
      this.setState(() => ({ [type]: val }));
    }
  };

  onNextOne = () => {
    const { loanType, loanDate } = this.state;
    if (!loanType) {
      message.error("请选择您的贷款类型。");
      return;
    }
    if (!loanDate) {
      message.error("请选择您的贷款期限。");
      return;
    }
    console.info(loanType);
  };

  onClick = key => {
    this.setState(pre => ({
      assetParam: { ...pre.assetParam, [key]: pre.assetParam[key] ? 0 : 1 }
    }));
  };

  render() {
    const { credits } = this.state;
    const { Option } = Select;
    const RadioGroup = Radio.Group;
    return (
      <div style={{ marginLeft: "290px" }}>
        {/* 职业身份 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">职业身份:</div>
          <div className="w40" />
          <Select
            placeholder="请选择"
            className="w310"
            size="large"
            onChange={val => this.onChange(val, "job")}
          >
            <Option value="1">买房</Option>
            <Option value="2">买车</Option>
          </Select>
        </div>

        {/* 收入方式 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">收入方式:</div>
          <div className="w40" />
          <Select
            placeholder="请选择"
            className="w310"
            size="large"
            onChange={val => this.onChange(val, "incomeWay")}
          >
            <Option value="1">1月</Option>
            <Option value="2">2月</Option>
          </Select>
        </div>

        {/* 月收入 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">月收入:</div>
          <div className="w40" />
          <Select
            placeholder="请选择"
            className="w310"
            size="large"
            onChange={val => this.onChange(val, "monthIncome")}
          >
            <Option value="1">1月</Option>
            <Option value="2">2月</Option>
          </Select>
        </div>

        {/* 信用情况 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">信用情况:</div>
          <div className="w40" />
          <RadioGroup
            onChange={val => this.onChange(val, "credit")}
            value={1}
            size="large"
          >
            <Radio value={1}>信用良好</Radio>
            <Radio value={2}>少量预期</Radio>
            <Radio value={3}>大量预期</Radio>
          </RadioGroup>
        </div>

        {/* 资产情况 */}
        <div className="flex mb15">
          <div
            style={{ lineHeight: "38px" }}
            className="font14 c333 w90 text-right"
          >
            资产情况:
          </div>
          <div className="w40" />
          <div style={{ width: "430px" }} className="flex wrap">
            {credits.map(item => (
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

        <Button
          type="primary"
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

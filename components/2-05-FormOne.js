import React, { Component } from "react";
import { Input, Select, Button, message, Radio, Cascader } from "antd";
import { isMobile, isName } from "@utils";

export default class extends Component {
  state = {
    name: null,
    age: null,
    money: null,
    loanType: null,
    loanDate: null,
    idNum: null,
    mobile: null,
    areas: [
      {
        value: 100,
        label: "郑州",
        isLeaf: false
      },
      {
        value: 200,
        label: "漯河",
        isLeaf: false
      }
    ]
  };
  onChange = (val, type) => {
    if (type === "name" || type === "code") {
      const { value } = val.target;
      this.setState(() => ({ [type]: value }));
    }
    if (
      type === "money" ||
      type === "mobile" ||
      type === "age" ||
      type === "idNum"
    ) {
      const { value } = val.target;
      const reg =
        type === "idNum"
          ? /^[a-z0-9]*$/
          : /^([1-9][0-9]*)?$/;
      if (reg.test(value)) {
        this.setState(() => ({ [type]: value }));
      }
    }
    if (type === "loanType") {
      this.setState(() => ({ [type]: val }));
    }
    if (type === "loanDate") {
      this.setState(() => ({ [type]: val }));
    }
  };
  onAreaChange = (value, selectedOptions) => {
    console.info(value, selectedOptions);
  };
  onNextOne = () => {
    const { name, money, mobile, loanType, loanDate } = this.state;
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
    if (!loanDate) {
      message.error("请选择您的贷款期限。");
      return;
    }
    if (!isMobile(mobile)) {
      message.error("您的手机号格式有误，请检查。");
      return;
    }
    console.info(name, money, mobile, loanType);
  };
  loadAreaData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: "dynamic1",
          isLeaf: selectedOptions.length === 2
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: "dynamic2",
          isLeaf: selectedOptions.length === 2
        }
      ];
      this.setState({
        areas: [...this.state.areas]
      });
    }, 1000);
  };
  render() {
    const { name, age, money, mobile, idNum, areas } = this.state;
    const { Option } = Select;
    const RadioGroup = Radio.Group;
    return (
      <div style={{ marginLeft: "290px" }}>
        {/* 姓名 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">姓名:</div>
          <div className="w40" />
          <Input
            placeholder="请输入您的真实姓名"
            size="large"
            className="w310"
            value={name}
            maxLength="4"
            onChange={val => this.onChange(val, "name")}
          />
        </div>

        {/* 性别 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">性别:</div>
          <div className="w40" />
          <RadioGroup
            onChange={val => this.onChange(val, "sex")}
            value={1}
            size="large"
          >
            <Radio value={1}>男士</Radio>
            <Radio value={2}>女士</Radio>
          </RadioGroup>
        </div>

        {/* 年龄 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">年龄:</div>
          <div className="w40" />
          <Input
            placeholder="请输入您的年龄"
            size="large"
            className="w310"
            value={age}
            maxLength="2"
            onChange={val => this.onChange(val, "age")}
          />
        </div>

        {/* 手机号 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">手机号:</div>
          <div className="w40" />
          <Input
            placeholder="请输入手机号"
            size="large"
            className="w310"
            value={mobile}
            maxLength="11"
            onChange={val => this.onChange(val, "mobile")}
          />
        </div>

        {/* 贷款金额 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">贷款金额:</div>
          <div className="w40" />
          <div className="w310">
            <Input
              placeholder="请输入贷款金额"
              size="large"
              addonAfter="元"
              value={money}
              maxLength="9"
              onChange={val => this.onChange(val, "money")}
            />
          </div>
        </div>

        {/* 贷款类型 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">贷款类型:</div>
          <div className="w40" />
          <Select
            placeholder="请选择"
            className="w310"
            size="large"
            onChange={val => this.onChange(val, "loanType")}
          >
            <Option value="1">买房</Option>
            <Option value="2">买车</Option>
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
            <Option value="1">1月</Option>
            <Option value="2">2月</Option>
          </Select>
        </div>

        {/* 身份证号 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">身份证号:</div>
          <div className="w40" />
          <Input
            placeholder="请输入您的真实身份证号"
            size="large"
            className="w310"
            value={idNum}
            maxLength="18"
            onChange={val => this.onChange(val, "idNum")}
          />
        </div>

        {/* 所在地区 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">所在地区:</div>
          <div className="w40" />
          <Cascader
            className="w310"
            size="large"
            placeholder="请选择/asdf/asdf"
            options={areas}
            loadData={this.loadAreaData}
            onChange={this.onAreaChange}
            changeOnSelect
          />
        </div>

        {/* 婚姻 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">婚姻状况:</div>
          <div className="w40" />
          <RadioGroup
            onChange={val => this.onChange(val, "sex")}
            value={1}
            size="large"
          >
            <Radio value={1}>未婚</Radio>
            <Radio value={2}>已婚</Radio>
          </RadioGroup>
        </div>

        <Button
          type="primary"
          className="h40 font16 w220 r2"
          style={{ margin: "0 0 56px 200px" }}
          onClick={this.onNextOne}
        >
          下一步
        </Button>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Input, Select, Button, message, Radio, Cascader, Alert } from "antd";
import uuid from "uuid/v4";
import { isName, isIDNumber, http } from "@utils";

export default class extends Component {
  state = {};
  componentDidMount() {
    this.initAreas();
  }
  onChange = (val, type) => {
    if (type === "name" || type === "sex" || type === "marry") {
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
    const {
      name,
      sex,
      age,
      money,
      loanType,
      loanDate,
      loanUse,
      needTime,
      idNum,
      myArea,
      marry
    } = this.state;
    const {
      initName,
      initSex,
      initMoney,
      initGenre,
      initMarry,
      onNextOne
    } = this.props;
    if (!isName(name || name === "" ? name : initName)) {
      this.onErrMsg("请输入您的姓名，2-4字。");
      return;
    }
    if (!age) {
      this.onErrMsg("请输入您的年龄。");
      return;
    }
    if (!(money || money === "" ? money : initMoney)) {
      this.onErrMsg("请输入您的贷款金额。");
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
    if (!isIDNumber(idNum)) {
      this.onErrMsg("请输入正确的身份证号。");
      return;
    }
    if (!myArea) {
      this.onErrMsg("请选择您所在的地区。");
      return;
    }

    const param = {
      name: name || initName,
      sex: sex || initSex[0].id,
      age,
      money: name || initMoney,
      genre: loanType || initGenre,
      timelimit: loanDate,
      purpose: loanUse,
      cycle: needTime,
      idNum,
      province_id: myArea[0],
      city_id: myArea[1],
      county_id: myArea[2],
      marital_status: marry || initMarry[0].id,
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

  // 异步加载省市区域，三级联动
  loadAreaData = selectedOptions => {
    const len = selectedOptions.length;
    const targetOption = selectedOptions[len - 1];
    const reqKey = len === 1 ? "city" : "county";
    const paramKey = len === 1 ? "province" : "city";

    targetOption.loading = true;
    http
      .get(`common/get_${reqKey}`, { [`${paramKey}_id`]: targetOption.value })
      .then(response => {
        if (response.code === 200 && response.success) {
          targetOption.loading = false;
          const fetchData = response.data[reqKey];
          if (!fetchData || fetchData.length === 0) {
            targetOption.children = null;
          } else {
            const newData = fetchData.map(item => ({
              value: item.id,
              label: item.name,
              isLeaf: len === 2
            }));
            targetOption.children = newData;
          }
          this.setState(() => ({
            areas: [...this.state.areas]
          }));
        } else {
          message.error(response.msg || "抱歉，请求异常，请稍后再试！");
        }
      })
      .catch(err => {
        message.error("网络错误，请稍后再试！");
        console.info(err);
      });
  };
  initAreas = () => {
    const { initProvince } = this.props;
    const areas = initProvince.map(item => ({
      value: item.id,
      label: item.name,
      isLeaf: false
    }));
    this.setState(() => ({ areas }));
  };
  render() {
    const { name, age, money, idNum, areas, errMsg } = this.state;
    const { Option } = Select;
    const RadioGroup = Radio.Group;
    const {
      initName,
      initMoney,
      initMobile,
      initGenre,
      initSex,
      initLimit,
      initPurpose,
      initCycle,
      initMarry,
      isLoading
    } = this.props;
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
            value={name || name === "" ? name : initName}
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
            value={this.state.sex || initSex[0].id}
            size="large"
          >
            {initSex.map(item => (
              <Radio key={uuid()} value={item.id}>
                {item.name}
              </Radio>
            ))}
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
            disabled
            size="large"
            className="w310"
            value={initMobile || 13603983223}
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
              value={money || money === "" ? money : initMoney}
              maxLength="8"
              onChange={val => this.onChange(val, "money")}
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
            placeholder="请选择"
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
            onChange={val => this.onChange(val, "marry")}
            value={this.state.marry || initMarry[0].id}
            size="large"
          >
            {initMarry.map(item => (
              <Radio key={uuid()} value={item.id}>
                {item.name}
              </Radio>
            ))}
          </RadioGroup>
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

import React, { Component } from "react";
import { Input, Select, Button, message, Radio, Cascader } from "antd";
import uuid from "uuid/v4";
import { isMobile, isName, isIDNumber, http } from "@utils";

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
      mobile,
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
      initMobile,
      initMoney,
      initGenre,
      initMarry
    } = this.props;
    if (!initName && !isName(name)) {
      message.error("请输入您的真实姓名，2-4个汉字");
      return;
    }
    if (!age) {
      message.error("请输入您的年龄");
      return;
    }

    // 注意，手机这里应该是固定，并且不可编辑
    if (!initMobile && !isMobile(mobile)) {
      message.error("您的手机号格式有误，请检查。");
      return;
    }
    if (!initMoney && !money) {
      message.error("请输入您的贷款金额");
      return;
    }

    // 这个省去，不再判断
    if (!initGenre && !loanType) {
      message.error("请选择您的贷款类型。");
      return;
    }
    if (!loanDate) {
      message.error("请选择您的贷款期限。");
      return;
    }
    if (!loanUse) {
      message.error("请选择您的贷款用途。");
      return;
    }
    if (!needTime) {
      message.error("请选择您的需款时间。");
      return;
    }
    if (!isIDNumber(idNum)) {
      message.error("请输入正确的身份证号。");
      return;
    }
    if (!myArea) {
      message.error("请选择您所在的地区。");
      return;
    }

    const param = {
      name,
      sex: sex || initSex[0].id,
      age,
      money,
      provide_a_loan_type_id: loanType || initGenre,
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

    console.info(param);
  };
  loadAreaData = selectedOptions => {
    const len = selectedOptions.length;
    const targetOption = selectedOptions[len - 1];
    targetOption.loading = true;
    const reqKey = len === 1 ? "city" : "county";
    const paramKey = len === 1 ? "province" : "city";

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
    // load options lazily
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
    const { name, age, money, mobile, idNum, areas } = this.state;
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
      initMarry
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
            placeholder="请输入手机号"
            size="large"
            className="w310"
            value={mobile || mobile === "" ? mobile : initMobile}
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

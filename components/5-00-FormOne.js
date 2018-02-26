import React, { Component } from "react";
import {
  Input,
  Button,
  Upload,
  Icon,
  message,
  Radio,
  Cascader,
  Alert
} from "antd";
import uuid from "uuid/v4";
import { isName, isIDNumber, http } from "@utils";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJPG) {
    message.error("请选择JPG或者PNG文件上传!");
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error("图片大小不能超过1M!");
  }
  return isJPG && isLt2M;
}

export default class extends Component {
  state = { loading: false, myArea: [] };
  componentDidMount() {
    this.initAreas();
  }
  onChange = (val, type) => {
    if (
      type === "nickname" ||
      type === "name" ||
      type === "sex" ||
      type === "marry"
    ) {
      const { value } = val.target;
      this.setState(() => ({ [type]: value }));
    }
    if (type === "mobile" || type === "age" || type === "idNum") {
      const { value } = val.target;
      const reg = type === "idNum" ? /^[a-z0-9]*$/ : /^([1-9][0-9]*)?$/;
      if (reg.test(value)) {
        this.setState(() => ({ [type]: value }));
      }
    }
  };
  onAreaChange = (val, type) => {
    const levelList = ["province", "city", "county"];
    const len = val.length;
    const id = val[len - 1];
    const level = levelList[len - 1];
    http.get("station/station_by_area_id", { id, level }).then(response => {
      if (response.code === 200 && response.success) {
        const { station } = response.data;
        this.setState(() => ({ station }));
      }
    });
    this.setState(() => ({ [type]: val }));
  };
  onNextOne = () => {
    const {
      nickname,
      name,
      imageUrl,
      avatar,
      sex,
      age,
      idNum,
      myArea,
      marry,
      station
    } = this.state;
    const {
      initNickName,
      initName,
      initAge,
      initAreaVal,
      initAvatar,
      initStationId,
      initIdNum,
      initSex,
      initMySex,
      initMarry,
      initMyMarry,
      onNextOne
    } = this.props;
    if (!(nickname || nickname === "" ? nickname : initNickName)) {
      this.onErrMsg("请输入您的用户名，最多11个字符。");
      return;
    }
    if (!isName(name || name === "" ? name : initName)) {
      this.onErrMsg("请输入您的姓名，2-4字。");
      return;
    }
    if (!myArea && !initAreaVal[0]) {
      this.onErrMsg("请选择您的注册站点。");
      return;
    }
    if (!imageUrl && !initAvatar) {
      this.onErrMsg("请上传您的头像。");
      return;
    }
    if (!(age || age === "" ? age : initAge)) {
      this.onErrMsg("请输入您的年龄。");
      return;
    }
    if (!isIDNumber(idNum || idNum === "" ? idNum : initIdNum)) {
      this.onErrMsg("请输入正确的身份证号。");
      return;
    }

    const param = {
      username: nickname || initNickName,
      name: name || initName,
      avatar: avatar || initAvatar,
      sex: sex || initMySex || initSex[0].id,
      age: age || initAge,
      idNum: idNum || initIdNum,
      province_id: myArea[0] ? myArea[0] : initAreaVal[0],
      city_id: myArea[0] ? myArea[1] : initAreaVal[1],
      county_id: myArea[0] ? myArea[2] : initAreaVal[2],
      marital_status: marry || initMyMarry || initMarry[0].id,
      station_id: station ? station.id : initStationId
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
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState(() => ({ loading: true }));
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState(
          () => ({
            imageUrl,
            loading: false
          }),
          () => {
            const index = imageUrl.indexOf("base64,") + 7;
            const url = imageUrl.substring(index);
            http
              .post("common/upload_picture", { url })
              .then(response => {
                if (response.code === 200 && response.success) {
                  const avatar = response.data.url;
                  this.setState(() => ({ avatar }));
                } else {
                  message.error(response.msg || "抱歉，请求异常，请稍后再试！");
                }
              })
              .catch(err => {
                message.error("网络错误，请稍后再试！");
                console.info(err);
              });
          }
        )
      );
    }
  };
  render() {
    const {
      nickname,
      name,
      age,
      idNum,
      areas,
      errMsg,
      imageUrl,
      station
    } = this.state;
    const RadioGroup = Radio.Group;
    const {
      initNickName,
      initName,
      initAreaName,
      initAvatar,
      initMobile,
      initSex,
      initMySex,
      initAge,
      initIdNum,
      initMarry,
      initMyMarry,
      initDisabled,
      onEdit,
      isLoading
    } = this.props;
    const uploadButton = (
      <div>
        <Icon
          type={this.state.loading ? "loading" : "plus"}
          className="font32 c999"
        />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const marryStatus = ["未婚", "已婚", "离异", "丧偶"];
    return (
      <div style={{ marginLeft: "140px" }}>
        {/* 用户名 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">用户名:</div>
          <div className="w40" />
          <Input
            disabled={initDisabled}
            placeholder="请输入您的昵称(最多11个字符)"
            size="large"
            className="w310"
            value={nickname || nickname === "" ? nickname : initNickName}
            maxLength="11"
            onChange={val => this.onChange(val, "nickname")}
          />
        </div>
        {/* 姓名 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">姓名:</div>
          <div className="w40" />
          <Input
            disabled={initDisabled}
            placeholder="请输入您的真实姓名"
            size="large"
            className="w310"
            value={name || name === "" ? name : initName}
            maxLength="4"
            onChange={val => this.onChange(val, "name")}
          />
        </div>

        {/* 注册站点 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">注册站点:</div>
          <div className="w40" />
          <Cascader
            className="w310"
            disabled={initDisabled}
            size="large"
            placeholder={initAreaName || "请选择"}
            options={areas}
            allowClear={false}
            loadData={this.loadAreaData}
            onChange={val => this.onAreaChange(val, "myArea")}
            changeOnSelect
          />
          {station &&
            station.name && (
              <div className="pl10 c-main font14">{station.name}站</div>
            )}
        </div>

        {/* 上传头像 */}
        <div className="flex mb30">
          <div className="font14 c333 w90 text-right">上传头像:</div>
          <div className="w40" />
          <Upload
            name="avatar"
            disabled={initDisabled}
            listType="picture-card"
            className="w120 h120 font20"
            showUploadList={false}
            action="http://jr.duduapp.net/web/common/upload_picture"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl || initAvatar ? (
              <img
                src={imageUrl || initAvatar}
                className="block w100 h100"
                alt=""
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>

        {/* 性别 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">性别:</div>
          <div className="w40" />
          {initDisabled ? (
            <div className="font14 c999">
              {!initMySex || initMySex === 1 ? "男" : "女"}
            </div>
          ) : (
            <RadioGroup
              onChange={val => this.onChange(val, "sex")}
              value={this.state.sex || initMySex || initSex[0].id}
              size="large"
            >
              {initSex.map(item => (
                <Radio key={uuid()} value={item.id}>
                  {item.name}
                </Radio>
              ))}
            </RadioGroup>
          )}
        </div>

        {/* 年龄 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">年龄:</div>
          <div className="w40" />
          <Input
            placeholder="请输入您的年龄"
            disabled={initDisabled}
            size="large"
            className="w310"
            value={age || age === "" ? age : initAge}
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
            value={initMobile}
            maxLength="11"
          />
        </div>

        {/* 身份证号 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">身份证号:</div>
          <div className="w40" />
          <Input
            placeholder="请输入您的真实身份证号"
            disabled={initDisabled}
            size="large"
            className="w310"
            value={idNum || idNum === "" ? idNum : initIdNum}
            maxLength="18"
            onChange={val => this.onChange(val, "idNum")}
          />
        </div>

        {/* 婚姻 */}
        <div className="flex ai-center mb30">
          <div className="font14 c333 w90 text-right">婚姻状况:</div>
          <div className="w40" />
          {initDisabled ? (
            <div className="font14 c999">
              {marryStatus[initMyMarry ? initMyMarry - 1 : 0]}
            </div>
          ) : (
            <RadioGroup
              onChange={val => this.onChange(val, "marry")}
              value={this.state.marry || initMyMarry || initMarry[0].id}
              size="large"
            >
              {initMarry.map(item => (
                <Radio key={uuid()} value={item.id}>
                  {item.name}
                </Radio>
              ))}
            </RadioGroup>
          )}
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
          onClick={initDisabled ? onEdit : this.onNextOne}
        >
          {initDisabled ? "编辑资料" : "提交保存"}
        </Button>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Icon, Input, Select, message } from "antd";
import Router from "next/router";
import QRCode from "qrcode-react";
import uuid from "uuid/v4";
import {
  http,
  strTostr,
  arrToDateString,
  arrToArr,
  clipBigNum,
  getCookie,
  fee,
  cache
} from "@utils";
import {
  Layout,
  WrapLink,
  HomeRankListItem,
  ErrorFetch,
  Btn
} from "@components";

const echarts = require("../../static/scripts/echarts.min.js");
const util = require("util");

export default class extends Component {
  static async getInitialProps(ctx) {
    const { query: { id }, req } = ctx;
    try {
      const { data } = await http.get(
        `common_city_loans/detail/${id}`,
        null,
        !!req
      );
      return { data };
    } catch (error) {
      const err = util.inspect(error);
      return { err };
    }
  }
  state = {
    selectValue: null,
    moneyVal: null,
    finalMoney: null
  };
  componentDidMount() {
    if (!this.props.data || !this.props.data.loan) return;
    const {
      data: { loan: { sum_start, timelimit, interest_rate } }
    } = this.props;
    this.myChart = echarts.init(this.echartBox);

    if (sum_start && timelimit && interest_rate) {
      const initTatal = fee(sum_start, interest_rate, arrToArr(timelimit)[0]);
      const initFee = fee(sum_start, interest_rate, arrToArr(timelimit)[0], 1);
      this.myChart.setOption(this.setMyOption(initFee, initTatal));
    }
  }
  onMoneyChange = e => {
    const { value } = e.target;
    const reg = /^([1-9][0-9]*)?$/;
    if (reg.test(value)) {
      this.setState(() => ({ moneyVal: value }));
    }
  };
  onMoneyBlur = e => {
    const { data: { loan: { sum_start, sum_end } } } = this.props;
    const { value } = e.target;
    let finalVal;
    finalVal = +value;
    if (+value > sum_end) {
      finalVal = +sum_end;
    }
    if (+value < sum_start) {
      finalVal = +sum_start;
    }
    this.setState(() => ({ finalMoney: finalVal, moneyVal: finalVal }));
  };
  onSelectChange = selectValue => {
    const { data: { loan: { sum_start, interest_rate } } } = this.props;
    const { finalMoney } = this.state;
    const initTatal = fee(finalMoney || sum_start, interest_rate, selectValue);
    const initFee = fee(finalMoney || sum_start, interest_rate, selectValue, 1);
    this.myChart.setOption(this.setMyOption(initFee, initTatal));
    this.setState(() => ({ selectValue }));
  };
  onApply = (type, url, id, name, start, end) => {
    const { url: { pathname, asPath }, data } = this.props;
    if (!getCookie("token")) {
      message.warn("当前操作需要登录", 2, () => {
        Router.push(
          {
            pathname: "/4-me/1-login",
            query: {
              href: pathname,
              as: asPath,
              id: data.loan.id,
              requireData: 1
            }
          },
          "/login"
        );
      });
      return true;
    }
    if (!cache.getItem("userId")) {
      message.warn("当前操作需要完善基本资料", 2, () => {
        Router.push(
          {
            pathname: "/4-me/2-home",
            query: {
              href: pathname,
              as: asPath,
              id: data.loan.id,
              requireData: 1
            }
          },
          "/me"
        );
      });
      return true;
    }
    if (!cache.getItem("userJob")) {
      message.warn("当前操作需要完善其他资料", 2, () => {
        Router.push(
          {
            pathname: "/4-me/3-other-data",
            query: {
              href: pathname,
              as: asPath,
              id: data.loan.id,
              requireData: 1
            }
          },
          "/me/other"
        );
      });
      return true;
    }
    // type 2 同城  1 极速
    if (type === 2) {
      Router.push(
        {
          pathname: "/1-loan/5-city-apply-loan",
          query: { id, name, start, end }
        },
        "/loan/city"
      );
    }
    if (type === 1) {
      http.post("loans/top_speed_apply", { id });
      this.setState(() => ({ showQrcode: true }));
    }
    return null;
  };
  setMyOption = (fee, total) => ({
    color: ["#ff764c", "#7eaeff"],
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["100%", "68%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 4
        },
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        silent: true,
        data: [
          { value: fee, name: "利息和费用", color: "yellow" },
          { value: total, name: "到账金额" }
        ]
      }
    ]
  });
  render() {
    const { selectValue, moneyVal, finalMoney, showQrcode } = this.state;
    const { data, err } = this.props;
    const { Option } = Select;
    if (err) {
      return <ErrorFetch err={err} />;
    }
    return (
      <Layout title="贷款详情" style={{ backgroundColor: "#f8f8f8" }}>
        {/* banner */}
        <div className="loan-banner-bg" />
        <div className="box">
          <div className="h70 flex ai-center crumbs-ico-bg">
            <WrapLink href="/" as="/" className="c333 font16">
              首页
            </WrapLink>
            <div className="crumbs-ico-right-bg ml10 mr10" />
            <WrapLink
              href={
                data && data.loan && data.loan.category === 1
                  ? "/1-loan/2-home-speed"
                  : "/1-loan/1-home"
              }
              as={
                data && data.loan && data.loan.category === 1
                  ? "/loan/speed"
                  : "/loan"
              }
              className="c333 font16"
            >
              {data && data.loan && data.loan.category === 1
                ? "极速贷"
                : "同城贷"}
            </WrapLink>
            <div className="crumbs-ico-right-bg ml10 mr10" />
            <span className="c333 font16">
              {(data && data.loan && data.loan.name) || "贷款详情"}
            </span>
          </div>
          {/* 核心块 */}
          <div className="flex box">
            {/* 左半拉，产品筛选以及列表 */}
            <div className="equal mr20 c333 overflow-h">
              <div className="bg-white">
                <div className="h100 loandetail-title flex ai-center pl30">
                  <div className="w70 h70">
                    <img
                      className="w-100 h-100"
                      src={data && data.loan && data.loan.thumb}
                      alt=""
                    />
                  </div>
                  <div className="pl15 equal overflow-h">
                    <div className="flex mb15 ai-center">
                      <div className="l120 font20 bold mr10 text-overflow-one">
                        {data && data.loan && data.loan.name}
                      </div>
                      {/* {data &&
                        data.loan &&
                        data.loan.apply_material_name &&
                        data.loan.apply_material_name.length > 0 &&
                        data.loan.apply_material_name.slice(0, 7).map(item => (
                          <div
                            key={uuid()}
                            className="c-second font14 plr10 flex ai-center mr10 equal-no text-overflow-one"
                            style={{
                              backgroundColor: "#ffebe4",
                              height: "24px",
                              maxWidth: "100px"
                            }}
                          >
                            {item}
                          </div>
                        ))} */}
                    </div>
                    <div className="lh150 font16 c666 text-overflow-one">
                      {data && data.loan && data.loan.description}
                    </div>
                  </div>
                </div>
                <div className="plr30">
                  <div
                    className="flex ai-center loandetail-border-b"
                    style={{ height: "140px", width: "830px" }}
                  >
                    <div
                      className="loandetail-border-r"
                      style={{ paddingRight: "50px", maxWidth: "250px" }}
                    >
                      <div className="font16 mb15">还款方式</div>
                      <div className="font18 bold text-overflow-one">
                        {data && data.loan && data.loan.payment_method}
                      </div>
                    </div>
                    <div
                      className="loandetail-border-r pl20 equal-no"
                      style={{ paddingRight: "50px", maxWidth: "220px" }}
                    >
                      <div className="font16 mb15">放款时间</div>
                      <div className="font18 bold text-overflow-one">
                        {data && data.loan && data.loan.cycle}
                      </div>
                    </div>
                    <div
                      className="pl20 equal-no"
                      style={{ paddingRight: "50px", maxWidth: "160px" }}
                    >
                      <div className="font16 mb15">
                        参考{data &&
                          data.loan &&
                          data.loan.interest_rate_method}利率
                      </div>
                      <div className="font18 bold text-overflow-one">
                        {data && data.loan && data.loan.interest_rate}%
                      </div>
                    </div>
                    {/* <div
                      className="pl20 equal-no"
                      style={{ maxWidth: "200px" }}
                    >
                      <div className="font16 mb15">申请人数</div>
                      <div className="font18 bold text-overflow-one">
                        {data && data.loan && data.loan.apply_num}
                      </div>
                    </div> */}
                  </div>
                  {/* canvs表区域 */}
                  <div className="flex jc-center" style={{ marginTop: "45px" }}>
                    <div style={{ marginRight: "65px" }}>
                      <Input
                        className="font16 no-outline"
                        style={{ width: "234px" }}
                        maxLength="8"
                        addonBefore="贷款金额:"
                        addonAfter="元"
                        value={
                          moneyVal || moneyVal === ""
                            ? moneyVal
                            : data && data.loan && data.loan.sum_start
                        }
                        onChange={this.onMoneyChange}
                        onBlur={this.onMoneyBlur}
                      />
                      {data &&
                        data.loan && (
                          <div className="font16 c666 mt15 pl10 text-overflow-one">
                            金额范围：{clipBigNum(data.loan.sum_start)}-{clipBigNum(
                              data.loan.sum_end
                            )}
                          </div>
                        )}
                    </div>
                    <div>
                      {data &&
                        data.loan &&
                        data.loan.timelimit &&
                        data.loan.timelimit.length > 0 && (
                          <div style={{ width: "234px" }} className="flex">
                            <div
                              style={{ lineHeight: "30px" }}
                              className="equal ant-input-group-addon"
                            >
                              贷款期限
                            </div>
                            <Select
                              value={
                                selectValue || arrToArr(data.loan.timelimit)[0]
                              }
                              onChange={this.onSelectChange}
                              style={{ width: "154px" }}
                            >
                              {arrToArr(data.loan.timelimit).map(item => (
                                <Option key={uuid()} value={item}>
                                  {strTostr(item)}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        )}
                      <div className="font16 c666 pl10 mt15 text-overflow-one">
                        贷款期限：
                        {data &&
                          data.loan &&
                          data.loan.timelimit &&
                          arrToDateString(arrToArr(data.loan.timelimit))}
                      </div>
                    </div>
                  </div>
                  <div className="h40" />
                  <div className="flex jc-center ai-center">
                    <div
                      className="relative"
                      style={{ width: "174px", height: "174px" }}
                    >
                      <div
                        style={{ width: "174px", height: "174px" }}
                        className="relative"
                        ref={ele => (this.echartBox = ele)}
                      />
                      <div className="absolute-full z-index10 flex column jc-center ai-center">
                        <div className="font20">总还款</div>
                        <div className="font20 bold">
                          {data &&
                            data.loan &&
                            fee(
                              finalMoney || data.loan.sum_start,
                              data.loan.interest_rate,
                              selectValue || arrToArr(data.loan.timelimit)[0]
                            )}
                        </div>
                      </div>
                    </div>
                    <div style={{ minWidth: "200px" }} className="ml30 font16">
                      <div className="flex ai-center mb20">
                        <span className="loandetail-globule mr5 bg-main circle" />
                        <span>到账金额：</span>
                        <span className="c-main">
                          {finalMoney ||
                            (data && data.loan && data.loan.sum_start)}
                        </span>
                      </div>
                      <div className="flex ai-center mb20">
                        <span className="loandetail-globule mr5 bg-second circle" />
                        <span>利息和费用：</span>
                        <span className="c-second">
                          {" "}
                          {data &&
                            data.loan &&
                            fee(
                              finalMoney || data.loan.sum_start,
                              data.loan.interest_rate,
                              selectValue || arrToArr(data.loan.timelimit)[0],
                              1
                            )}
                        </span>
                      </div>
                      <div className="flex ai-center">
                        <span className="loandetail-globule mr5 bg-ccc circle" />
                        <span>月还款：</span>
                        <span className="c-ccc">
                          {data &&
                            data.loan &&
                            fee(
                              finalMoney || data.loan.sum_start,
                              data.loan.interest_rate,
                              selectValue || arrToArr(data.loan.timelimit)[0],
                              2
                            )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h40" />
                </div>
              </div>
              <div className="h30" />
              {/* 申请 */}
              <div className="pl30 bg-white" style={{ paddingTop: "40px" }}>
                {/* 极速贷申请流程 */}
                {data &&
                  data.loan &&
                  data.loan.category &&
                  data.loan.category === 1 && (
                    <div>
                      <div className="flex mb30">
                        <div className="loandetail-right-icon" />
                        <div className="pl10 font18 bold lh100">申请流程</div>
                      </div>
                      <div
                        className="pt15 flex font16"
                        style={{ width: "860px", overflow: "auto" }}
                      >
                        {data &&
                          data.flowpath &&
                          data.flowpath.length > 0 &&
                          data.flowpath.map((item, index) => (
                            <div
                              className="flex jc-between"
                              key={uuid()}
                              style={{
                                width: `${
                                  index === data.flowpath.length - 1
                                    ? ""
                                    : "180px"
                                }`
                              }}
                            >
                              <div className="flex column ai-center">
                                <div className="w38 h40 mb20">
                                  <img
                                    src={item.icon}
                                    alt=""
                                    className="w-100 h-100"
                                  />
                                </div>
                                <div className="w80 text-overflow-one text-center">
                                  {item.step_name}
                                </div>
                              </div>
                              {index === data.flowpath.length - 1 || (
                                <Icon
                                  className="pt10"
                                  type="right"
                                  style={{
                                    fontSize: 16,
                                    color: "#dedede",
                                    paddingRight: "40px"
                                  }}
                                />
                              )}
                            </div>
                          ))}
                      </div>
                      <div className="h60" />
                    </div>
                  )}
                {/* 申请条件 */}
                <div>
                  <div className="flex mb30">
                    <div className="he18 loandetail-right-icon" />
                    <div className="pl10 font18 bold lh100">申请条件</div>
                  </div>
                  <div
                    className="pl20 font14 c33"
                    dangerouslySetInnerHTML={{
                      __html:
                        (data &&
                          data.loan &&
                          data.loan.application_requirements) ||
                        "暂无信息"
                    }}
                  />
                </div>
                {/* 申请材料判断 */}
                {data &&
                  data.loan &&
                  data.loan.category === 2 && (
                    <div>
                      <div className="h60" />
                      <div className="flex mb30">
                        <div className="he18 loandetail-right-icon" />
                        <div className="pl10 font18 bold lh100">申请材料</div>
                      </div>
                      <div
                        className="pl20 font14 c33"
                        dangerouslySetInnerHTML={{
                          __html:
                            (data && data.loan && data.loan.apply_material) ||
                            "暂无信息"
                        }}
                      />
                    </div>
                  )}
                {/* 利率说明 */}
                <div
                  className={`${
                    data &&
                    data.loan &&
                    data.loan.category &&
                    data.loan.category === 1
                      ? "h60"
                      : "h44"
                  }`}
                />
                {data &&
                  data.loan &&
                  data.loan.category &&
                  data.loan.category === 2 && (
                    <div>
                      <div className="flex mb30">
                        <div className="he18 loandetail-right-icon" />
                        <div className="pl10 font18 bold lh100">利率说明</div>
                      </div>
                      <div
                        className="pl20 font14 c33"
                        dangerouslySetInnerHTML={{
                          __html:
                            (data && data.loan && data.loan.rate_explain) ||
                            "暂无信息"
                        }}
                      />
                      <div style={{ height: "60px" }} />
                    </div>
                  )}
                {/* 咨询电话 */}
                <div className="c999 font16 lh100 mb30">
                  咨询电话：{(data && data.loan && data.loan.customer_tel) ||
                    "暂无信息"}
                </div>
                {!showQrcode &&
                  data &&
                  data.loan &&
                  data.loan.category && (
                    <Btn
                      btnClass="font18 bold c-white bg-main block h44 text-center r4"
                      style={{ width: "200px", lineHeight: "44px" }}
                      con="马上申请"
                      onClick={() =>
                        this.onApply(
                          data.loan.category,
                          data.loan.external_links,
                          data.loan.id,
                          data.loan.name,
                          data.loan.sum_start,
                          data.loan.sum_end
                        )
                      }
                    />
                  )}
                {showQrcode &&
                  data &&
                  data.loan &&
                  data.loan.external_links && (
                    <QRCode
                      value={data.loan.external_links}
                      logo="http://public.duduapp.net/finance/pc-static/img/qrcode_ico.png"
                      logoWidth={34}
                    />
                  )}
                {showQrcode && (
                  <div
                    style={{ width: "128px" }}
                    className="c333 font18 text-center mt10"
                  >
                    立即扫码申请
                  </div>
                )}
                <div className="h50" />
              </div>
              <div className="h60" />
            </div>
            {/* 右半拉，申请贷款以及app广告位 */}
            <div style={{ width: "290px" }}>
              {/* 热门分类 */}
              <div className="plr25 pt25 pb10 bg-white">
                <div className="font20 bold lh100 mb25">热门分类</div>
                <div className="flex wrap jc-between">
                  {data &&
                    data.type &&
                    data.type.length > 0 &&
                    data.type.map((item, index) => (
                      <WrapLink
                        key={uuid()}
                        href={`${
                          data &&
                          data.loan &&
                          data.loan.category &&
                          data.loan.category === 1
                            ? "/1-loan/2-home-speed"
                            : "/1-loan/1-home"
                        }`}
                        as={`
                        ${
                          data &&
                          data.loan &&
                          data.loan.category &&
                          data.loan.category === 1
                            ? "/loan/speed"
                            : "/loan"
                        }?typeloan=${item.id}&typeloanfocus=${index + 1}`}
                        className="mb20 text-center h34 w110 block c-main loandetail-hot text-overflow-one r2"
                      >
                        {item.name}
                      </WrapLink>
                    ))}
                </div>
              </div>
              <div className="h20" />
              {data &&
              data.loan &&
              data.loan.category &&
              data.loan.category === 1 ? (
                <div className="pb25 pt30 plr30 bg-white">
                  <div className="font18 c333 text-center mb25 lh120">
                    APP下载，享专属优惠
                  </div>
                  <div className="flex jc-around ai-center mb20">
                    <div className="w70" style={{ height: "130px" }}>
                      <img
                        src="/static/images/foot_app.png"
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="w100 h100 app-qrcode-bg" />
                  </div>
                  <div className="c-main font14 text-center lh120">
                    最高可借30万,最快当天放款
                  </div>
                </div>
              ) : (
                <div className="plr10 ptb25 bg-white">
                  <div className="pl15 pb15 font20 lh100 bold">相关推荐</div>
                  {data &&
                    data.recommend &&
                    data.recommend.length > 0 &&
                    data.recommend.map(item => (
                      <HomeRankListItem key={uuid()} item={item} isrank />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

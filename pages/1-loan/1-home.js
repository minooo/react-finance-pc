// Fragment
import React, { Component, Fragment } from "react";
import uuid from "uuid/v4";
import { Icon, Pagination } from "antd";
import {
  Layout,
  Btn,
  WrapLink,
  HomeForm,
  LoanSelect,
  LoanCityFilter,
  LoanList
} from "@components";

export default class extends Component {
  /* eslint-disable */
  state = {
    tabFocus: 0,
    money: null,
    date: null,
    typeFocus: 0,
    jobFocus: 0,
    applyFocus: 0,
    creditFocus: 0,
    soon_moneyFocus: 0,
    soon_dateFocus: 0,
    soon_typeFocus: 0,
    soon_applyFocus: 0,
    soon_getFocus: 0,
    tabTypes: [
      {
        title: "同城贷",
        ico: "loan-tab-one",
        icoActive: "loan-tab-one-active"
      },
      { title: "极速贷", ico: "loan-tab-two", icoActive: "loan-tab-two-active" }
    ],
    loanMoney: [
      { id: 0, title: "金额不限" },
      { id: 1, title: "100-5000" },
      { id: 2, title: "5000-1万" },
      { id: 3, title: "1万-5万" },
      { id: 4, title: "5万以上" }
    ],
    loanDate: [
      { id: 0, title: "期限不限" },
      { id: 1, title: "1-3个月" },
      { id: 2, title: "3-6个月" },
      { id: 3, title: "6-12个月" },
      { id: 4, title: "12个月以上" }
    ],
    cityFilters: [
      {
        title: "贷款类型",
        key: "type",
        list: [{ id: 1, title: "房产抵押贷" }, { id: 2, title: "车辆抵押贷" }]
      },
      {
        title: "职业身份",
        key: "job",
        list: [{ id: 1, title: "上班族" }, { id: 2, title: "个体户" }]
      },
      {
        title: "申请资质",
        key: "apply",
        list: [{ id: 1, title: "名下有车" }, { id: 2, title: "名下有房" }]
      },
      {
        title: "信用情况",
        key: "credit",
        list: [
          { id: 1, title: "1年内逾期超过3次或超过90" },
          { id: 2, title: "1年内逾期少于3次且少于90天" },
          { id: 3, title: "无信用卡或贷款信用良好，无逾期" }
        ]
      }
    ],
    soonFilters: [
      {
        title: "贷款金额",
        key: "soon_money",
        list: [
          { id: 0, title: "金额不限" },
          { id: 1, title: "100-5000" },
          { id: 2, title: "5000-1万" },
          { id: 3, title: "1万-5万" },
          { id: 4, title: "5万以上" }
        ]
      },
      {
        title: "贷款期限",
        key: "soon_date",
        list: [
          { id: 0, title: "期限不限" },
          { id: 1, title: "1-3个月" },
          { id: 2, title: "3-6个月" },
          { id: 3, title: "6-12个月" },
          { id: 4, title: "12个月以上" }
        ]
      },
      {
        title: "贷款类型",
        key: "soon_type",
        list: [
          { id: 0, title: "芝麻分贷款" },
          { id: 1, title: "手机贷款" },
          { id: 2, title: "信用卡贷款" },
          { id: 3, title: "实名制贷款" },
          { id: 4, title: "工薪贷" }
        ]
      },
      {
        title: "申请资质",
        key: "soon_apply",
        list: [
          { id: 0, title: "名下有车" },
          { id: 1, title: "名下有房" },
          { id: 2, title: "有信用卡" },
          { id: 3, title: "有社保" },
          { id: 4, title: "有网购账号" }
        ]
      },
      {
        title: "下款周期",
        key: "soon_get",
        list: [
          { id: 0, title: "当天下款" },
          { id: 1, title: "两日下款" },
          { id: 2, title: "一周下款" }
        ]
      }
    ],
    sortFilter: [
      { title: "综合排序", id: 11 },
      { title: "新品优先", id: 22 },
      { title: "额度最小", id: 33 },
      { title: "利率最低", id: 44 }
    ],
    sortFilterFocus: 0,
    searchList: [
      {
        title: "贷款产品标题贷款产品标题贷款产品标题贷款产品标题",
        img: "http://dummyimage.com/66x66",
        caption: "这是一些次要说明",
        minMoney: "5000",
        maxMoney: "10000000",
        timelimit: "6月-12月",
        rate: "1.29",
        rateMethod: "月",
        payMethod: "当天下款",
        applyNum: "22451"
      },
      {
        title: "贷款产品标题222",
        img: "http://dummyimage.com/66x66",
        caption: "这是一些次要说明222",
        minMoney: "5000",
        maxMoney: "10000000",
        timelimit: "6月-12月",
        rate: "1.29",
        rateMethod: "日",
        payMethod: "当天下款",
        applyNum: "451"
      }
    ]
  };
  /* eslint-enable */
  onSwitchLoan = index => {
    if (this.state.tabFocus !== index) {
      this.setState({ tabFocus: index, sortFilterFocus: 0 });
    }
  };
  onSelectChange = (val, type) => {
    this.setState(() => ({ [type]: val }));
  };
  onCityChoice = (key, id, index) => {
    this.setState(() => ({ [`${key}Focus`]: index }));
  };
  onSortFilter = (id, index) => {
    this.setState(() => ({ sortFilterFocus: index }));
  };
  onPageChange = (page, pageSize) => {
    console.info(page, pageSize);
  };
  render() {
    const {
      tabFocus,
      tabTypes,
      cityFilters,
      loanMoney,
      loanDate,
      sortFilter,
      sortFilterFocus,
      searchList,
      soonFilters
    } = this.state;
    return (
      <Layout title="贷款超市" style={{ backgroundColor: "#f8f8f8" }}>
        {/* banner */}
        <div style={{ height: "300px", backgroundColor: "#6bb0ff" }}>
          <div
            style={{ backgroundColor: "#6bb0ff" }}
            className="box h-100 loan-banner-bg"
          />
        </div>
        <div style={{ marginTop: "-134px" }} className="box mb30">
          {/* 选项卡按钮 */}
          <div className="flex ai-end">
            {tabTypes.map((item, index) => (
              <Btn
                key={uuid()}
                ver
                style={{ width: "300px", borderRadius: "10px 10px 0 0" }}
                btnClass={`${
                  tabFocus === index ? "bg-white h64" : "bg-main h50"
                  } mr10`}
                con={
                  <div
                    className={`${
                      tabFocus === index
                        ? `${item.icoActive} c-main`
                        : `${item.ico} c-white`
                      } pl30 font24`}
                  >
                    {item.title}
                  </div>
                }
                onClick={() => this.onSwitchLoan(index)}
              />
            ))}
          </div>
          {/* 主体 */}
          <div className="bg-white">
            {/* 面包屑 */}
            <div className="h70 flex ai-center plr20">
              <WrapLink href="/" as="/" className="c333 font16">
                首页
              </WrapLink>
              <Icon type="right" className="plr5" />
              <span className="c999 font16">贷款超市</span>
            </div>
            {/* 核心块 */}
            <div className="flex pr20">
              {/* 左半拉，产品筛选以及列表 */}
              <div className="equal plr20 overflow-h">
                {/* 筛选条件 */}
                {tabFocus === 0 ? (
                  <Fragment>
                    <div className="flex mb20 pl20">
                      <div className="flex ai-center mr30 pr20">
                        <LoanSelect
                          title="贷款金额"
                          options={loanMoney}
                          onSelectChange={this.onSelectChange}
                          type="money"
                        />
                      </div>
                      <div className="flex ai-center">
                        <LoanSelect
                          title="贷款期限"
                          options={loanDate}
                          onSelectChange={this.onSelectChange}
                          type="date"
                        />
                      </div>
                    </div>
                    {cityFilters &&
                      cityFilters.length > 0 && (
                        <LoanCityFilter
                          cityFilters={cityFilters}
                          onCityChoice={this.onCityChoice}
                          state={this.state}
                        />
                      )}
                  </Fragment>
                ) : (
                    <Fragment>
                      {soonFilters &&
                        soonFilters.length > 0 && (
                          <LoanCityFilter
                            cityFilters={soonFilters}
                            onCityChoice={this.onCityChoice}
                            state={this.state}
                          />
                        )}
                    </Fragment>
                  )}

                {/* 排序tab */}
                <div
                  className="flex jc-between ai-center h50 pr20"
                  style={{ backgroundColor: "#f6f6f6" }}
                >
                  <div className="flex">
                    {sortFilter.map((item, index) => (
                      <Btn
                        key={uuid()}
                        btnClass="plr20"
                        con={
                          <span
                            className={`${
                              sortFilterFocus === index ? "c-main" : "c333"
                              } font16`}
                          >
                            {item.title}
                          </span>
                        }
                        onClick={() => this.onSortFilter(item.id, index)}
                      />
                    ))}
                  </div>
                  <div className="font14 c333">
                    共找到<span className="font16 c-main">20</span>款产品
                  </div>
                </div>
                {searchList &&
                  searchList.length > 0 &&
                  searchList.map(item => <LoanList key={uuid()} item={item} />)}
                <div className="pb30 flex jc-center">
                  <Pagination
                    hideOnSinglePage
                    className="pt30"
                    defaultCurrent={1}
                    defaultPageSize={10}
                    total={searchList.length}
                    onChange={this.onPageChange}
                  />
                </div>
              </div>
              {/* 右半拉，申请贷款以及app广告位 */}
              <div style={{ width: "290px" }}>
                <div className="plr20 pb20 loan-border">
                  <HomeForm />
                </div>
                <div className="h40" />
                <div className="loan-border pb25 pt30 plr30">
                  <div className="font18 c333 text-center mb25 lh120">APP下载，享专属优惠</div>
                  <div className="flex jc-around ai-center mb20">
                    <div className="w70" style={{ height: "130px" }}>
                      <img src="../../static/images/foot_app.png" className="w-100" alt="" />
                    </div>
                    <div className="w100 h100">
                      <img src="../../static/images/foot_code.png" className="w-100" alt="" />
                    </div>
                  </div>
                  <div className="c-main font14 text-center lh120">最高可借20万,当天放款</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

// Fragment
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import { Icon, Pagination, message } from "antd";
import { http } from "@utils";
import { getLoansHome } from "@actions";
import reduxPage from "@reduxPage";
import {
  Layout,
  Btn,
  WrapLink,
  HomeForm,
  LoanSelect,
  LoanCityFilter,
  LoanList,
  ErrorFetch,
  LoadingFetch
} from "@components";

const util = require("util");
@reduxPage
@connect(({ loansHome }) => ({ loansHome }))
export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { store, isServer } = ctx;

    if (!store.getState().loansHome) {
      try {
        const loansHomeFetch = await http.get("loans/index", null, isServer);
        const loansHomeData = loansHomeFetch.data;
        store.dispatch(getLoansHome(loansHomeData));
      } catch (error) {
        const err = util.inspect(error);
        return { err };
      }
    }
    return null;
  }
  /* eslint-disable */
  state = {
    tabFocus: 0,

    typeFocus: 0,
    identityFocus: 0,
    aptitudeFocus: 0,
    credit_conditionFocus: 0,

    hasCitySearched: false,
    searchCityCount: null,
    sortFilterFocus: 0,
    searchCityList: null,
    currentSearchPage: 1,
    isFetch: false,
    fetchSearchParam: {},
    money_section: 0,
    timelimit: 0,

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
    ]
  };
  /* eslint-enable */
  onSwitchLoan = index => {
    if (this.state.tabFocus !== index) {
      this.setState({ tabFocus: index, sortFilterFocus: 0 });
    }
  };
  onSelectChange = (key, id) => {
    this.setState(
      pre => ({
        isFetch: true,
        fetchSearchParam: {
          ...pre.fetchSearchParam,
          ...(id !== 0 && { [key]: id })
        },
        [key]: id,
        currentSearchPage: 1
      }),
      () => {
        const { fetchSearchParam } = this.state;
        this.fetchData(
          "loan/list",
          fetchSearchParam,
          "hasCitySearched",
          "searchCityList",
          "searchCityCount"
        );
      }
    );
  };
  onCityChoice = (key, id, index) => {
    this.setState(
      pre => ({
        [`${key}Focus`]: index,
        isFetch: true,
        fetchSearchParam: { ...pre.fetchSearchParam, [key]: id },
        currentSearchPage: 1
      }),
      () => {
        const { fetchSearchParam } = this.state;
        this.fetchData(
          "loan/list",
          fetchSearchParam,
          "hasCitySearched",
          "searchCityList",
          "searchCityCount"
        );
      }
    );
  };
  onSortFilter = (id, index) => {
    if (this.state.sortFilterFocus !== index) {
      this.setState(
        pre => ({
          isFetch: true,
          sortFilterFocus: index,
          fetchSearchParam: { ...pre.fetchSearchParam, sort: id },
          currentSearchPage: 1
        }),
        () => {
          const { fetchSearchParam } = this.state;
          this.fetchData(
            "loan/list",
            fetchSearchParam,
            "hasCitySearched",
            "searchCityList",
            "searchCityCount"
          );
        }
      );
    }
  };
  onPageChange = page => {
    this.setState(
      () => ({
        isFetch: true,
        currentSearchPage: page
      }),
      () => {
        const { fetchSearchParam } = this.state;
        this.fetchData(
          "loan/list",
          { ...fetchSearchParam, page },
          "hasCitySearched",
          "searchCityList",
          "searchCityCount"
        );
      }
    );
  };
  fetchData = (fetchPath, fetchParam, hasSearched, list, count) => {
    http
      .get("loans/list", fetchParam)
      .then(response => {
        // 这里的判断条件根据具体的接口情况而调整
        this.setState(() => ({ isFetch: false, [hasSearched]: true }));
        if (response.code === 200 && response.success) {
          const listData =
            response.data && response.data.list && response.data.list.list;
          const countNum =
            response.data && response.data.list && response.data.list.count;
          this.setState(() => ({ [list]: listData, [count]: countNum }));
        } else {
          message.error(
            response.msg ? response.msg : "抱歉，请求异常，请稍后再试！"
          );
        }
      })
      .catch(err => {
        message.error("网络错误，请稍后再试！");
        console.info(err);
      });
  };
  render() {
    const {
      tabFocus,
      tabTypes,
      sortFilterFocus,
      isFetch,
      hasCitySearched,
      searchCityList,
      searchCityCount,
      currentSearchPage,
      money_section,
      timelimit,
      soonFilters
    } = this.state;
    const { loansHome, err } = this.props;
    if (err) {
      return <ErrorFetch err={err} />;
    }
    return (
      <Layout title="贷款超市" style={{ backgroundColor: "#f8f8f8" }}>
        {isFetch && <LoadingFetch />}
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
                        {loansHome &&
                          loansHome.money_section && (
                            <LoanSelect
                              title="贷款金额"
                              options={loansHome.money_section}
                              onSelectChange={this.onSelectChange}
                              type="money_section"
                              value={money_section}
                            />
                          )}
                      </div>
                      <div className="flex ai-center">
                        {loansHome &&
                          loansHome.timelimit && (
                            <LoanSelect
                              title="贷款期限"
                              options={loansHome.timelimit}
                              onSelectChange={this.onSelectChange}
                              type="timelimit"
                              value={timelimit}
                            />
                          )}
                      </div>
                    </div>
                    {loansHome &&
                      loansHome.cityFilters &&
                      loansHome.cityFilters.length > 0 && (
                        <LoanCityFilter
                          cityFilters={loansHome.cityFilters}
                          onCityChoice={this.onCityChoice}
                          state={this.state}
                        />
                      )}
                    {/* 排序tab */}
                    <div
                      className="flex jc-between ai-center h50 pr20"
                      style={{ backgroundColor: "#f6f6f6" }}
                    >
                      {((hasCitySearched && searchCityCount > 0) ||
                        (!hasCitySearched &&
                          loansHome.list &&
                          loansHome.list.count > 0)) &&
                        loansHome &&
                        loansHome.sort &&
                        loansHome.sort.length > 0 && (
                          <div className="flex">
                            {loansHome.sort.map((item, index) => (
                              <Btn
                                key={uuid()}
                                btnClass="plr20"
                                con={
                                  <span
                                    className={`${
                                      sortFilterFocus === index
                                        ? "c-main"
                                        : "c333"
                                    } font16`}
                                  >
                                    {item.name}
                                  </span>
                                }
                                onClick={() =>
                                  this.onSortFilter(item.id, index)
                                }
                              />
                            ))}
                          </div>
                        )}
                      <div className="font14 c333 pl20">
                        {hasCitySearched ? (
                          searchCityCount > 0 ? (
                            <Fragment>
                              一共为您找到
                              <span className="c-main plr5 font16">
                                {searchCityCount}
                              </span>款产品
                            </Fragment>
                          ) : (
                            `orry~没有找到符合您筛选条件的产品。${
                              loansHome &&
                              loansHome.recommend &&
                              loansHome.recommend.length > 0
                                ? "您可以看看以下精选贷款产品"
                                : ""
                            }`
                          )
                        ) : loansHome &&
                        loansHome.list &&
                        loansHome.list.count > 0 ? (
                          <Fragment>
                            一共为您找到
                            <span className="c-main plr5">
                              {loansHome.list.count}
                            </span>款贷款产品
                          </Fragment>
                        ) : (
                          "sorry~暂无相关贷款产品"
                        )}
                      </div>
                    </div>
                    {/* 满足以下条件时，出现推荐列表 */}
                    {hasCitySearched &&
                      !(searchCityCount > 0) &&
                      loansHome &&
                      loansHome.recommend &&
                      loansHome.recommend.length > 0 &&
                      loansHome.recommend.map(item => (
                        <LoanList key={uuid()} item={item} />
                      ))}
                    {loansHome &&
                      loansHome.list &&
                      loansHome.list.list &&
                      loansHome.list.list.length > 0 &&
                      (hasCitySearched
                        ? searchCityList &&
                          searchCityList.length > 0 &&
                          searchCityList.map(item => (
                            <LoanList key={uuid()} item={item} />
                          ))
                        : loansHome.list.list.map(item => (
                            <LoanList key={uuid()} item={item} />
                          )))}

                    <div className="pb30 flex jc-center">
                      <Pagination
                        hideOnSinglePage
                        className="pt30"
                        current={currentSearchPage}
                        defaultPageSize={10}
                        total={
                          hasCitySearched
                            ? searchCityCount
                            : loansHome &&
                              loansHome.list &&
                              loansHome.list.count > 0
                              ? loansHome.list.count
                              : 1
                        }
                        onChange={this.onPageChange}
                      />
                    </div>
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
              </div>
              {/* 右半拉，申请贷款以及app广告位 */}
              <div style={{ width: "290px" }}>
                <div className="plr20 pb20 loan-border">
                  <HomeForm />
                </div>
                <div className="h40" />
                <div className="loan-border pb25 pt30 plr30">
                  <div className="font18 c333 text-center mb25 lh120">
                    APP下载，享专属优惠
                  </div>
                  <div className="flex jc-around ai-center mb20">
                    <div className="w70" style={{ height: "130px" }}>
                      <img
                        src="../../static/images/foot_app.png"
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="w100 h100">
                      <img
                        src="../../static/images/foot_code.png"
                        className="w-100"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="c-main font14 text-center lh120">
                    最高可借20万,当天放款
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

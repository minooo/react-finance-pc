// Fragment
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import { Pagination, message } from "antd";
import { http, searchToObj } from "@utils";
import { getLoansSpeedHome } from "@actions";
import reduxPage from "@reduxPage";
import {
  Layout,
  Btn,
  WrapLink,
  HomeForm,
  LoanCityFilter,
  LoanList,
  ErrorFetch,
  LoadingFetch
} from "@components";

const util = require("util");
@reduxPage
@connect(({ loansSpeedHome }) => ({ loansSpeedHome }))
export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { store, isServer, asPath } = ctx;

    if (!store.getState().loansSpeedHome) {
      try {
        const loansHomeFetch = await http.get(
          "loans/index/topspeed",
          null,
          isServer
        );
        const loansHomeData = loansHomeFetch.data;
        store.dispatch(getLoansSpeedHome(loansHomeData));
      } catch (error) {
        const err = util.inspect(error);
        return { err };
      }
    }
    return { asPath };
  }
  /* eslint-disable */
  state = {
    money_sectionFocus: 0,
    timelimitFocus: 0,
    typeFocus: 0,
    aptitudeFocus: 0,
    cycleFocus: 0,
    hasCitySearched: false,
    searchCityCount: null,
    sortFilterFocus: 0,
    searchCityList: null,
    currentSearchPage: 1,
    isFetch: false,
    fetchSearchParam: {},
    tabTypes: [
      {
        title: "同城贷",
        ico: "loan-tab-one",
        icoActive: "loan-tab-one-active"
      },
      { title: "极速贷", ico: "loan-tab-two", icoActive: "loan-tab-two-active" }
    ]
  };
  componentDidMount() {
    // 针对首页点击某个分类过来，应该做的数据转化。
    const { asPath } = this.props
    const query = searchToObj(asPath)
    if (query.typeloan) {
      const id = +query.typeloan
      const index = +query.typeloanfocus
      this.onCityChoice("type", id, index)
    }
  }
  /* eslint-enable */
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
          { ...fetchSearchParam, page },
          "hasCitySearched",
          "searchCityList",
          "searchCityCount"
        );
      }
    );
  };
  fetchData = (fetchParam, hasSearched, list, count) => {
    http
      .get("loans/list?category=topspeed", fetchParam)
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
      tabTypes,
      sortFilterFocus,
      isFetch,
      hasCitySearched,
      searchCityList,
      searchCityCount,
      currentSearchPage
    } = this.state;
    const { loansSpeedHome, err } = this.props;
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
              <WrapLink
                key={uuid()}
                href={index === 0 ? "/1-loan/1-home" : "/1-loan/2-home-speed"}
                as={index === 0 ? "/loan" : "/loan/speed"}
                style={{ width: "300px", borderRadius: "10px 10px 0 0" }}
                className={`${
                  index === 1 ? "bg-white h64" : "bg-main h50"
                } mr10 flex jc-center ai-center`}
              >
                <div
                  className={`${
                    index === 1
                      ? `${item.icoActive} c-main`
                      : `${item.ico} c-white`
                  } pl30 font24`}
                >
                  {item.title}
                </div>
              </WrapLink>
            ))}
          </div>
          {/* 主体 */}
          <div className="bg-white">
            {/* 面包屑 */}
            <div className="h70 flex ai-center crumbs-ico-bg ml20">
              <WrapLink href="/" as="/" className="c333 font16">
                首页
              </WrapLink>
              <div className="crumbs-ico-right-bg ml10 mr10" />
              <WrapLink
                href="/1-loan/1-home"
                as="/loan"
                className="c333 font16"
              >
                贷款超市
              </WrapLink>
              <div className="crumbs-ico-right-bg ml10 mr10" />
              <span className="c999 font16">极速贷</span>
            </div>
            {/* 核心块 */}
            <div className="flex pr20">
              {/* 左半拉，产品筛选以及列表 */}
              <div className="equal plr20 overflow-h">
                {/* 筛选条件 */}
                {loansSpeedHome &&
                  loansSpeedHome.speedFilters &&
                  loansSpeedHome.speedFilters.length > 0 && (
                    <LoanCityFilter
                      cityFilters={loansSpeedHome.speedFilters}
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
                      loansSpeedHome.list &&
                      loansSpeedHome.list.count > 0)) &&
                    loansSpeedHome &&
                    loansSpeedHome.sort &&
                    loansSpeedHome.sort.length > 0 && (
                      <div className="flex">
                        {loansSpeedHome.sort.map((item, index) => (
                          <Btn
                            key={uuid()}
                            btnClass="plr20"
                            con={
                              <span
                                className={`${
                                  sortFilterFocus === index ? "c-main" : "c333"
                                } font16`}
                              >
                                {item.name}
                              </span>
                            }
                            onClick={() => this.onSortFilter(item.id, index)}
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
                        `sorry~没有找到符合您筛选条件的产品。${
                          loansSpeedHome &&
                          loansSpeedHome.recommend &&
                          loansSpeedHome.recommend.list &&
                          loansSpeedHome.recommend.list.length > 0
                            ? "您可以看看以下精选贷款产品"
                            : ""
                        }`
                      )
                    ) : loansSpeedHome &&
                    loansSpeedHome.list &&
                    loansSpeedHome.list.count > 0 ? (
                      <Fragment>
                        一共为您找到
                        <span className="c-main plr5">
                          {loansSpeedHome.list.count}
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
                  loansSpeedHome &&
                  loansSpeedHome.recommend &&
                  loansSpeedHome.recommend.list &&
                  loansSpeedHome.recommend.list.length > 0 &&
                  loansSpeedHome.recommend.list.map(item => (
                    <LoanList key={uuid()} item={item} />
                  ))}
                {loansSpeedHome &&
                  loansSpeedHome.list &&
                  loansSpeedHome.list.list &&
                  loansSpeedHome.list.list.length > 0 &&
                  (hasCitySearched
                    ? searchCityList &&
                      searchCityList.length > 0 &&
                      searchCityList.map(item => (
                        <LoanList key={uuid()} item={item} />
                      ))
                    : loansSpeedHome.list.list.map(item => (
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
                        : loansSpeedHome &&
                          loansSpeedHome.list &&
                          loansSpeedHome.list.count > 0
                          ? loansSpeedHome.list.count
                          : 1
                    }
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
                  <div className="font18 c333 text-center mb25 lh120">
                    APP下载，享专属优惠
                  </div>
                  <div className="flex jc-around ai-center mb20">
                    <div className="w70 app-bg" style={{ height: "130px" }} />
                    <div className="w100 h100 app-qrcode-bg" />
                  </div>
                  <div className="c-main font14 text-center lh120">
                    最高可借30万,最快当天放款
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

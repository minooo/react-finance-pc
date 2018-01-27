import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import { Icon, Pagination, message } from "antd";
import { http } from "@utils";
import { getCardsHome } from "@actions";
import reduxPage from "@reduxPage";
import {
  Layout,
  WrapLink,
  LoanCityFilter,
  CardList,
  ErrorFetch,
  LoadingFetch,
  Ranking,
  CardRank
} from "@components";

const util = require("util");
@reduxPage
@connect(({ cardsHome }) => ({ cardsHome }))
export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { store, isServer } = ctx;

    if (!store.getState().cardsHome) {
      try {
        const cardHomeFetch = await http.get("card/index", null, isServer);
        const cardHomeData = cardHomeFetch.data;
        store.dispatch(getCardsHome(cardHomeData));
      } catch (error) {
        const err = util.inspect(error);
        return { err };
      }
    }
    return null;
  }
  /* eslint-disable */
  state = {
    bankFocus: 0,
    categoryFocus: 0,
    levelFocus: 0,
    yearFee_policyFocus: 0,
    currencyFocus: 0,
    currentPage: 1,
    hasSearched: false,
    isFetch: false,
    fetchParam: {},
    searchList: null,
    searchCount: null
  };
  /* eslint-enable */
  onCardChoice = (key, id, index) => {
    this.setState(
      pre => ({
        [`${key}Focus`]: index,
        isFetch: true,
        fetchParam: { ...pre.fetchParam, [key]: id },
        currentPage: 1,
      }),
      () => {
        const { fetchParam } = this.state;
        http
          .get("card/list", fetchParam)
          .then(response => {
            // 这里的判断条件根据具体的接口情况而调整
            this.setState(() => ({ isFetch: false, hasSearched: true }));
            if (response.code === 200 && response.success) {
              const searchList =
                response.data &&
                response.data.lists &&
                response.data.lists.cards;
              const searchCount =
                response.data &&
                response.data.lists &&
                response.data.lists.count;
              this.setState(() => ({ searchList, searchCount }));
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
      }
    );
  };
  onPageChange = page => {
    this.setState(
      () => ({ isFetch: true, currentPage: page }),
      () => {
        const { fetchParam } = this.state;
        http
          .get("card/list", { ...fetchParam, page })
          .then(response => {
            // 这里的判断条件根据具体的接口情况而调整
            this.setState(() => ({ isFetch: false, hasSearched: true }));
            if (response.code === 200 && response.success) {
              const searchList =
                response.data &&
                response.data.lists &&
                response.data.lists.cards;
              const searchCount =
                response.data &&
                response.data.lists &&
                response.data.lists.count;
              this.setState(() => ({ searchList, searchCount }));
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
      }
    );
  };
  render() {
    const { searchList, hasSearched, searchCount, isFetch, currentPage } = this.state;
    const { cardsHome, err } = this.props;
    if (err) {
      return <ErrorFetch err={err} />;
    }
    return (
      <Layout title="贷款超市" style={{ backgroundColor: "#f8f8f8" }}>
        {/* banner */}
        {isFetch && <LoadingFetch />}
        <div style={{ height: "300px", backgroundColor: "#6bb0ff" }}>
          <div
            style={{ backgroundColor: "#6bb0ff" }}
            className="box h-100 loan-banner-bg"
          />
        </div>
        <div style={{ marginTop: "-70px" }} className="box mb30">
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
                {cardsHome &&
                  cardsHome.cardFilters &&
                  cardsHome.cardFilters.length > 0 && (
                    <LoanCityFilter
                      cityFilters={cardsHome.cardFilters}
                      onCityChoice={this.onCardChoice}
                      state={this.state}
                    />
                  )}
                <div
                  className="flex jc-center font14 bold ai-center h50"
                  style={{ backgroundColor: "#f6f6f6" }}
                >
                  {hasSearched ? (
                    searchCount > 0 ? (
                      <Fragment>
                        一共为您找到
                        <span className="c-main plr5">{searchCount}</span>款产品
                      </Fragment>
                    ) : (
                        `orry~没有找到符合您筛选条件的信用卡。${
                        cardsHome &&
                          cardsHome.recommends &&
                          cardsHome.recommends.length > 0
                          ? "您可以看看以下精选热门卡"
                          : ""
                        }`
                      )
                  ) : cardsHome &&
                    cardsHome.lists &&
                    cardsHome.lists.count > 0 ? (
                        <Fragment>
                          一共为您找到
                          <span className="c-main plr5">
                            {cardsHome.lists.count}
                          </span>款产品
                        </Fragment>
                      ) : (
                        "sorry~暂无产品"
                      )}
                </div>
                {/* 满足以下条件时，出现推荐列表 */}
                {hasSearched &&
                  !(searchCount > 0) &&
                  cardsHome &&
                  cardsHome.recommends &&
                  cardsHome.recommends.length > 0 &&
                  cardsHome.recommends.map(item => (
                    <CardList key={uuid()} item={item} />
                  ))}
                {cardsHome &&
                  cardsHome.lists &&
                  cardsHome.lists.cards &&
                  cardsHome.lists.cards.length > 0 &&
                  (hasSearched
                    ? searchList &&
                    searchList.length > 0 &&
                    searchList.map(item => (
                      <CardList key={uuid()} item={item} />
                    ))
                    : cardsHome.lists.cards.map(item => (
                      <CardList key={uuid()} item={item} />
                    )))}
                <div className="pb30 flex jc-center">
                  <Pagination
                    hideOnSinglePage
                    className="pt30"
                    current={currentPage}
                    defaultPageSize={10}
                    total={
                      hasSearched
                        ? searchCount
                        : cardsHome && cardsHome.lists && cardsHome.lists.count
                          ? cardsHome.lists.count
                          : 1
                    }
                    onChange={this.onPageChange}
                  />
                </div>
              </div>
              {/* 右半拉，申请贷款以及app广告位 */}
              <div style={{ width: "310px" }}>
                <div className="loan-border ptb20 plr20">
                  <Ranking
                    title="信用卡排行榜"
                    bg="card-cardlist-bg"
                    list={cardsHome &&
                      cardsHome.new &&
                      cardsHome.new.cards
                      && cardsHome.new.cards.length > 0
                      && cardsHome.new.cards.map((item, index) => (
                        <CardRank item={item} index={index} />
                      ))}
                    othList={
                      cardsHome &&
                      cardsHome.hot &&
                      cardsHome.hot.cards
                      && cardsHome.hot.cards.length > 0
                      && cardsHome.hot.cards.map((item, index) => (
                        <CardRank item={item} index={index} />
                      ))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout >
    );
  }
}

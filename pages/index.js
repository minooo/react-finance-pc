import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel, message } from "antd";
import uuid from "uuid/v4";
import { http } from "@utils";
import { getHome } from "@actions";
import reduxPage from "@reduxPage";
import {
  Layout,
  HomeOnlineLoans,
  HomeCityselection,
  HomeType,
  HomeForm,
  WrapLink,
  HomeCoupon,
  HomeCardLink,
  HomeHotCardBox,
  HomeHotNew,
  ErrorFetch,
  LoadingFetch
} from "@components";

const util = require("util");
@reduxPage
@connect(({ home }) => ({ home }))
export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { store, req, asPath } = ctx;

    if (!store.getState().home) {
      try {
        const homeFetch = await http.get("home", null, !!req);
        const homeData = homeFetch.data;
        store.dispatch(getHome(homeData));
      } catch (error) {
        const err = util.inspect(error);
        return { err };
      }
    }
    return { asPath };
  }
  state = {
    cardTypeFocus: 0,
    hasSearched: false,
    isFetch: false,
    cardList: null,
    loanTypes: [
      { name: "芝麻分贷款", description: "有芝麻信用分就能贷", id: 4 },
      { name: "信用卡贷款", description: "有信用卡就能贷", id: 2 },
      { name: "工薪上班贷", description: "需要征信社保公积金", id: 3 },
      { name: "无工作贷款", description: "无工作也能贷", id: 5 },
      { name: "手机贷款", description: "手机实名认证就能贷", id: 1 },
    ]
  };
  onCardTypeClick = (id, index) => {
    // card/list?category=1
    this.setState(
      () => ({ cardTypeFocus: index, isFetch: true }),
      () => {
        this.fetchData(id);
      }
    );
  };
  fetchData = id => {
    http
      .get("card/list", { category: id, limit: 8 })
      .then(response => {
        // 这里的判断条件根据具体的接口情况而调整
        this.setState(() => ({ isFetch: false, hasSearched: true }));
        if (response.code === 200 && response.success) {
          const cardList =
            response.data && response.data.lists && response.data.lists.cards;
          this.setState(() => ({ cardList }));
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
      cardTypeFocus,
      cardList,
      hasSearched,
      isFetch,
      loanTypes
    } = this.state;
    const { home, err } = this.props;
    if (err) {
      return <ErrorFetch err={err} />;
    }
    return (
      <Layout title="首页">
        {isFetch && <LoadingFetch />}
        {/* 申请贷款/轮播图/贷款类型 */}
        <div className="relative" style={{ height: "480px" }}>
          <div className="relative" style={{ height: "480px" }}>
            <div className="flex home-form ai-center">
              <div
                style={{ width: "320px" }}
                className="bg-white home-shdow-mid plr30 pb30"
              >
                <HomeForm />
              </div>
            </div>
            {home &&
              home.banner &&
              home.banner.length === 1 && (
                <div
                  style={{ height: "480px" }}
                  className="relative overflow-h"
                >
                  <WrapLink key={uuid()} href={home.banner[0].url}>
                    <img
                      src={home.banner[0].image}
                      className="home-slide-img"
                      alt=""
                    />
                  </WrapLink>
                </div>
              )}

            {
              <Carousel className="home-carousel" autoplay>
                {home &&
                  home.banner &&
                  home.banner.length > 1 &&
                  home.banner.map(item => (
                    <WrapLink key={uuid()} className="relative" href={item.url}>
                      <img src={item.image} className="home-slide-img" alt="" />
                    </WrapLink>
                  ))}
              </Carousel>
            }
          </div>
        </div>
        <div className="flex jc-between box" style={{ marginTop: "45px" }}>
          {loanTypes.map((item, index) => (
            <HomeType key={uuid()} item={item} index={index} />
          ))}
        </div>
        {/* 第一个背景图 */}
        <div className="h80" />
          {/* 在线极速贷款 */}
          {home &&
            home.top_speed_loans && (
              <HomeOnlineLoans onlineLoans={home.top_speed_loans} />
          )}

          <div className="h80" />
          {/* 同城贷款贷款 */}
          {home &&
            home.common_city_loans_type &&
            home.common_city_loans && (
              <HomeCityselection
                citySelection={home.common_city_loans_type}
                rankingList={home.common_city_loans}
              />
          )}
        <div className="h40" />
        {/* 第二个背景图 */}
        <div className="home-bg-2">
          <div className="h40" />
          {/* 优惠活动 */}
          <div style={{ height: "580px" }} className="box flex">
            <div
              style={{ width: "266px" }}
              className="flex plr20 column mr20 home-shdow-mid bg-white "
            >
              <div className="font20 bold pt20 pb15">优惠活动</div>
              {home &&
                home.special_offer &&
                home.special_offer.length > 0 &&
                home.special_offer.map((item, index) => (
                  <HomeCoupon
                    key={uuid()}
                    item={item}
                    index={index}
                    len={home.special_offer.length - 1}
                  />
                ))}
            </div>
            <div className="equal home-shdow-mid pt20 bg-white ">
              <div className="flex jc-between plr20">
                <div className="font20 bold">热门卡片</div>
                <WrapLink
                  href="/2-card/1-home"
                  as="/card"
                  className="font16 mt5 more-link"
                >
                  更多
                </WrapLink>
              </div>
              <div className="flex ptb15 mb5">
                {home &&
                  home.card_types &&
                  home.card_types.length > 0 &&
                  home.card_types.map((item, index) => (
                    <HomeCardLink
                      key={uuid()}
                      item={item}
                      index={index}
                      len={home.card_types.length - 1}
                      cardTypeFocus={cardTypeFocus}
                      onCardTypeClick={this.onCardTypeClick}
                    />
                  ))}
              </div>
              <div className="plr20 flex wrap jc-between">
                {home &&
                  home.cards &&
                  home.cards.cards &&
                  home.cards.cards.length > 0 &&
                  (hasSearched ? (
                    cardList &&
                    cardList.length > 0 && <HomeHotCardBox items={cardList} />
                  ) : (
                    <HomeHotCardBox items={home.cards.cards} />
                  ))}
                {hasSearched &&
                  (!cardList || cardList.length === 0) && (
                    <div
                      className="flex jc-center font14 bold ai-center h50 plr20"
                      style={{ backgroundColor: "#f6f6f6" }}
                    >
                      sorry~暂无数据
                    </div>
                  )}
              </div>
            </div>
          </div>
          {/* 热门资讯/资讯排行 */}
          <div className="h70" />
        </div>
        <div className="h70" />
        <div
          style={{ height: "350px" }}
          className="box home-shdow-mid plr20 flex jc-between"
        >
          <div style={{ width: "793px" }}>
            <div className="flex jc-between pt25 pb15">
              <div className="font20 bold">热门资讯</div>
              <WrapLink
                href="/3-new/1-home"
                as="/new"
                className="font16 mt5 more-link"
              >
                更多
              </WrapLink>
            </div>
            <div className="flex jc-between">
              {home &&
                home.new_information &&
                home.new_information.length > 0 &&
                home.new_information.map((item, index) => (
                  <HomeHotNew key={uuid()} item={item} index={index} />
                ))}
            </div>
          </div>
          <div style={{ width: "280px" }}>
            <div className="font20 bold pt25 pb15">资讯排行</div>
            {home &&
              home.hot_information &&
              home.hot_information.length > 0 &&
              home.hot_information.slice(0, 8).map((item, index) => (
                <WrapLink
                  key={uuid()}
                  href={`/3-new/2-detail?id=${item.id}`}
                  as={`/new/${item.id}`}
                  style={{ marginBottom: "13px" }}
                  className="font14 c333 text-overflow-one block"
                  title={item.title}
                >
                  <span className={`${index > 2 ? "c333" : "c-main"}`}>
                    【{index + 1}】{" "}
                  </span>
                  {item.title}
                </WrapLink>
              ))}
          </div>
        </div>
        <div style={{ height: "140px" }} />
      </Layout>
    );
  }
}

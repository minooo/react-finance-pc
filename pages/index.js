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
    const { store, isServer, asPath } = ctx;

    if (!store.getState().home) {
      try {
        const homeFetch = await http.get("home", null, isServer);
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
    coupons: [
      {
        img: "http://dummyimage.com/224x140",
        link: "http://www.baidu.com"
      },
      {
        img: "http://dummyimage.com/224x140",
        link: "http://www.baidu.com"
      },
      {
        img: "http://dummyimage.com/224x140",
        link: "http://www.baidu.com"
      }
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
      coupons,
      cardTypeFocus,
      cardList,
      hasSearched,
      isFetch
    } = this.state;
    const { home, err } = this.props;
    if (err) {
      return <ErrorFetch err={err} />;
    }
    return (
      <Layout title="首页">
        {isFetch && <LoadingFetch />}
        {/* 申请贷款/轮播图/贷款类型 */}
        <div className="relative">
          <div
            style={{ width: "320px" }}
            className="bg-white home-shdow-mid home-form plr30 pb30"
          >
            <HomeForm />
          </div>
          <Carousel className="home-carousel" autoplay>
            <div>
              <h3 className="home-slide">aaa</h3>
            </div>
            <div>
              <h3 className="home-slide">bbb</h3>
            </div>
            <div>
              <h3 className="home-slide">ccc</h3>
            </div>
          </Carousel>
          <div className="flex jc-between home-type-position">
            {home &&
              home.top_speed_loans_type &&
              home.top_speed_loans_type.length > 0 &&
              home.top_speed_loans_type.map((item, index) => (
                <HomeType key={uuid()} item={item} index={index} />
              ))}
          </div>
        </div>

        <div style={{ height: "225px" }} />
        {/* 在线极速贷款 */}
        {home &&
          home.top_speed_loans && (
            <HomeOnlineLoans onlineLoans={home.top_speed_loans} />
          )}

        <div style={{ height: "100px" }} />
        {/* 同城贷款贷款 */}
        {home &&
          home.common_city_loans_type &&
          home.common_city_loans && (
            <HomeCityselection
              citySelection={home.common_city_loans_type}
              rankingList={home.common_city_loans}
            />
          )}

        <div style={{ height: "140px" }} />
        {/* 优惠活动 */}
        <div style={{ height: "580px" }} className="box flex">
          <div
            style={{ width: "266px" }}
            className="flex column ai-center mr20 home-shdow-mid"
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
                  len={coupons.length - 1}
                />
              ))}
          </div>
          <div className="equal home-shdow-mid pt20">
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
                    orry~暂无数据。
                  </div>
                )}
            </div>
          </div>
        </div>
        {/* 热门资讯/资讯排行 */}
        <div style={{ height: "140px" }} />
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
                  {index <= 2 && (
                    <span className="c-second">[ {index + 1} ] </span>
                  )}
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

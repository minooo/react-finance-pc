import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel } from "antd";
import uuid from "uuid/v4";
import reduxPage from "@reduxPage";
import {
  Layout,
  HomeType,
  HomeForm,
  WrapLink,
  HomeCoupon,
  HomeCardLink,
  HomeHotCard,
  HomeHotNew,
} from "@components";

@reduxPage
@connect(({ home }) => ({ home }))
export default class extends Component {
  state = {
    typeList: [
      {
        title: "标题1",
        caption: "副标题",
        img: "http://dummyimage.com/100x100"
      },
      {
        title: "标题1",
        caption: "副标题",
        img: "http://dummyimage.com/100x100"
      },
      {
        title: "标题1",
        caption: "副标题",
        img: "http://dummyimage.com/100x100"
      },
      {
        title: "标题1",
        caption: "副标题",
        img: "http://dummyimage.com/100x200"
      },
      {
        title: "标题1",
        caption: "副标题",
        img: "http://dummyimage.com/500x600"
      }
    ],
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
    ],
    cardTypes: [
      { title: "车主卡", id: 21 },
      { title: "商旅卡", id: 22 },
      { title: "标准卡", id: 23 },
      { title: "网络联名卡", id: 24 },
      { title: "这个受到法律框架按时灯笼裤飞机啊受到法律框架", id: 24 }
    ],
    cardTypeFocus: 0,
    hotCards: [
      {
        img: "http://dummyimage.com/170x106",
        title: "标题路过",
        caption: "二级标题路过",
        applyNum: 100,
        id: 123
      },
      {
        img: "http://dummyimage.com/170x106",
        title: "标题路过",
        caption: "二级标题路过",
        applyNum: 100,
        id: 123
      },
      {
        img: "http://dummyimage.com/170x106",
        title: "标题路过",
        caption: "二级标题路过",
        applyNum: 100,
        id: 123
      },
      {
        img: "http://dummyimage.com/170x106",
        title: "标题路过",
        caption: "二级标题路过",
        applyNum: 100,
        id: 123
      },
      {
        img: "http://dummyimage.com/170x106",
        title: "标题路过",
        caption: "二级标题路过",
        applyNum: 100,
        id: 123
      },
      {
        img: "",
        title: "标题路过",
        caption: "二级标题路过",
        applyNum: 100,
        id: 123
      }
    ],
    hotNews: [
      {
        img: "http://dummyimage.com/224x140",
        list: [
          { title: "个人信用贷款有哪些好处", id: 1 },
          { title: "个人信用贷款有哪些好处", id: 1 },
          { title: "个人信用贷款有哪些好处", id: 1 }
        ]
      },
      {
        img: "http://dummyimage.com/224x140",
        list: [
          { title: "个人信用贷款有哪些好处", id: 1 },
          { title: "个人信用贷款有哪些好处", id: 1 },
          { title: "个人信用贷款有哪些好处", id: 1 }
        ]
      },
      {
        img: "http://dummyimage.com/224x140",
        list: [
          { title: "个人信用贷款有哪些好处", id: 1 },
          { title: "个人信用贷款有哪些好处", id: 1 },
          { title: "个人信用贷款有哪些好处", id: 1 }
        ]
      }
    ],
    newsRank: [
      { title: "个人信用贷款有哪些好处", id: 1 },
      { title: "个人信用贷款有哪些好处", id: 1 },
      { title: "个人信用贷款有哪些好处", id: 1 },
      { title: "个人信用贷款有哪些好处", id: 1 },
      { title: "个人信用贷款有哪些好处", id: 1 },
      { title: "个人信用贷款有哪些好处", id: 1 },
      { title: "个人信用贷款有哪些好处", id: 1 },
      { title: "个人信用贷款有哪些好处", id: 1 },
      { title: "个人信用贷款有哪些好处", id: 1 },
      { title: "个人信用贷款有哪些好处", id: 1 },
      { title: "个人信用贷款有哪些好处", id: 1 },
      { title: "个人信用贷款有哪些好处", id: 1 },
      { title: "个人信用贷款有哪些好处", id: 1 }
    ]
  };
  onCardTypeClick = (id, index) => {
    this.setState(() => ({ cardTypeFocus: index }));
  };
  render() {
    const {
      typeList,
      coupons,
      cardTypes,
      cardTypeFocus,
      hotCards,
      hotNews,
      newsRank
    } = this.state;
    return (
      <Layout title="首页">
        {/* 申请贷款/轮播图/贷款类型 */}
        <div className="relative">
          <div
            style={{ width: "320px", height: "390px" }}
            className="bg-white home-shdow-mid home-form plr30"
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
            {typeList.map(item => <HomeType key={uuid()} item={item} />)}
          </div>
        </div>

        {/* 优惠活动/热门卡片 */}
        <div style={{ height: "225px" }} />
        <div style={{ height: "580px" }} className="box flex">
          <div
            style={{ width: "266px" }}
            className="flex column ai-center mr20 home-shdow-mid"
          >
            <div className="font20 bold pt20 pb15">优惠活动</div>
            {coupons &&
              coupons.length > 0 &&
              coupons.map((item, index) => (
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
                href="/card"
                as="/2-card/1-home"
                className="font16 mt5 more-link"
              >
                更多
              </WrapLink>
            </div>
            <div className="flex ptb15 mb5">
              {cardTypes &&
                cardTypes.length &&
                cardTypes.map((item, index) => (
                  <HomeCardLink
                    key={uuid()}
                    item={item}
                    index={index}
                    len={cardTypes.length - 1}
                    cardTypeFocus={cardTypeFocus}
                    onCardTypeClick={this.onCardTypeClick}
                  />
                ))}
            </div>
            <div className="plr20 flex wrap jc-between">
              {hotCards &&
                hotCards.length &&
                Array(...Array(8)).map((item, index) => {
                  if (hotCards[index]) {
                    return (
                      <HomeHotCard
                        key={uuid()}
                        item={hotCards[index]}
                        index={index}
                      />
                    );
                  }
                  return (
                    <div
                      key={uuid()}
                      style={{ width: "170px" }}
                      className={index !== 0 && index % 3 === 0 ? "" : "mr20"}
                    />
                  );
                })}
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
                href="/card"
                as="/2-card/1-home"
                className="font16 mt5 more-link"
              >
                更多
              </WrapLink>
            </div>
            <div className="flex jc-between">
              {hotNews &&
                hotNews.length > 0 &&
                hotNews.map(item => <HomeHotNew key={uuid()} item={item} />)}
            </div>
          </div>
          <div style={{ width: "280px" }}>
            <div className="font20 bold pt25 pb15">资讯排行</div>
            {newsRank &&
              newsRank.length > 0 &&
              newsRank.slice(0, 8).map((item, index) => (
                <WrapLink
                  key={uuid()}
                  href="/"
                  as="/"
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

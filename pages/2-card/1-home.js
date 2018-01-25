import React, { Component } from "react";
import uuid from "uuid/v4";
import { Icon, Pagination } from "antd";
import {
  Layout,
  WrapLink,
  HomeForm,
  LoanCityFilter,
  CardList
} from "@components";

export default class extends Component {
  /* eslint-disable */
  state = {
    soon_moneyFocus: 0,
    soon_dateFocus: 0,
    soon_typeFocus: 0,
    soon_applyFocus: 0,
    soon_getFocus: 0,
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
    searchList: [
      {
        title: "贷款产品标题贷款产品标题贷款产品标题贷款产品标题",
        img: "http://dummyimage.com/106x66",
        caption: "这是一些次要说明",
        grade: "白金卡",
        maxMoney: "10000000",
        cardType: "人民币",
        payMethod: "终身免年费",
        applyNum: "22451",
        link: "http://www.baidu.com"
      },
      {
        title: "贷款产品标题贷款产品标题贷款产品标题贷款产品标题",
        img: "http://dummyimage.com/106x66",
        caption: "这是一些次要说明",
        grade: "白金卡",
        maxMoney: "10000000",
        cardType: "人民币",
        payMethod: "终身免年费",
        applyNum: "22451",
        link: "http://www.baidu.com"
      }
    ]
  };
  /* eslint-enable */
  onCardChoice = (key, id, index) => {
    this.setState(() => ({ [`${key}Focus`]: index }));
  };
  onPageChange = (page, pageSize) => {
    console.info(page, pageSize);
  };
  render() {
    const { searchList, soonFilters } = this.state;
    return (
      <Layout title="贷款超市" style={{ backgroundColor: "#f8f8f8" }}>
        {/* banner */}
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
                {soonFilters &&
                  soonFilters.length > 0 && (
                    <LoanCityFilter
                      cityFilters={soonFilters}
                      onCityChoice={this.onCardChoice}
                      state={this.state}
                    />
                  )}
                <div
                  className="flex jc-center font14 bold ai-center h50"
                  style={{ backgroundColor: "#f6f6f6" }}
                >
                  {searchList && searchList.length > 0
                    ? `一共为您找到${searchList.length}款产品`
                    : "sorry~没有找到符合您筛选条件的信用卡，您可以看看以下精选热门卡"}
                </div>
                {searchList &&
                  searchList.length > 0 &&
                  searchList.map(item => <CardList key={uuid()} item={item} />)}
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
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

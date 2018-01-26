import React, { Component } from "react";
import uuid from "uuid/v4";
import { Icon, Pagination } from "antd";
import { Layout, WrapLink, NewTypeLink, NewList } from "@components";

export default class extends Component {
  state = {
    newTypeFocus: 0,
    NewTypes: [
      { title: "贷款攻略", id: 21 },
      { title: "贷款新闻", id: 22 },
      { title: "政策法规", id: 23 }
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
    ],
    newList: [
      {
        img: "/static/images/home_hotnew_0.png",
        title: "互联网调查第一期出炉：“现金贷”平台差评多",
        text:
          "【环球网 记者 陈超】由环球网财经频道推出的《新金融 新革命 2017互联网金融网络调查》已经正式...线二周，获得众多",
        time: "2017-10-10",
        number: "120浏览"
      },
      {
        img: "http://dummyimage.com/176x110",
        title: "“现金贷”平台差评多",
        text:
          "【环球网 记者 陈超】由环球网财经频道推出的《新金融 新革命 2017互联网金融网络调查》已经正式...线二周，获得众多",
        time: "2017-10-10",
        number: "120浏览"
      }
    ]
  };
  onNewTypeClick = (id, index) => {
    this.setState(() => ({ newTypeFocus: index }));
  };
  onPageChange = (page, pageSize) => {
    console.info(page, pageSize);
  };
  render() {
    const { newTypeFocus, NewTypes, newsRank, newList } = this.state;
    return (
      <Layout title="资讯" style={{ backgroundColor: "#f8f8f8" }}>
        {/* banner */}
        <div style={{ height: "300px", backgroundColor: "#6bb0ff" }}>
          <div
            style={{ backgroundColor: "#6bb0ff" }}
            className="box h-100 loan-banner-bg"
          />
        </div>
        {/* 主体 */}
        <div className="box">
          {/* 面包屑 */}
          <div className="h70 flex ai-center plr20">
            <WrapLink href="/" as="/" className="c333 font16">
              首页
            </WrapLink>
            <Icon type="right" className="plr5" />
            <span className="c333 font16">资讯</span>
            <Icon type="right" className="plr5" />
            <span className="c999 font16">{NewTypes[newTypeFocus].title}</span>
          </div>
          {/* 核心块 */}
          <div className="flex">
            {/* 左边 资讯列表 */}
            <div
              style={{ paddingLeft: "50px" }}
              className="equal pr30 bg-white"
            >
              {/* 分类选项 */}
              <div className="h114 flex ai-center">
                {NewTypes &&
                  NewTypes.length &&
                  NewTypes.map((item, index) => (
                    <NewTypeLink
                      key={uuid()}
                      item={item}
                      index={index}
                      newTypeFocus={newTypeFocus}
                      onNewTypeClick={this.onNewTypeClick}
                    />
                  ))}
              </div>
              <div className="pt20">
                {newList &&
                  newList.length > 0 &&
                  newList.map(item => <NewList key={uuid()} item={item} />)}
              </div>
              <div className="flex jc-center">
                <Pagination
                  style={{ paddingBottom: "50px" }}
                  hideOnSinglePage
                  className="pt10"
                  defaultCurrent={1}
                  defaultPageSize={10}
                  total={newList.length}
                  onChange={this.onPageChange}
                />
              </div>
            </div>
            {/* 右边 资讯排行 */}
            <div
              style={{ width: "280px" }}
              className="ml20 plr25 pb15 bg-white"
            >
              <div className="font20 bold pt25 pb15">资讯排行</div>
              {newsRank &&
                newsRank.length > 0 &&
                newsRank.slice(0, 8).map((item, index) => (
                  <WrapLink
                    key={uuid()}
                    href="/"
                    as="/"
                    className="font14 c333 mb10 text-overflow-one block"
                    title={item.title}
                  >
                    <span className={index < 3 ? "c-main" : "c666"}>
                      [ {index + 1} ]{" "}
                    </span>
                    {item.title}
                  </WrapLink>
                ))}
            </div>
          </div>
        </div>
        <div style={{ height: "53px" }} />
      </Layout>
    );
  }
}

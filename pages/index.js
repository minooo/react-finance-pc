import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import reduxPage from "@reduxPage";
import { Layout, HomeType, HomeRankingList } from "@components";
@reduxPage
@connect(({ home }) => ({ home }))
export default class extends Component {
  state = {
    typeList: [
      {
        title: "芝麻分就能借",
        caption: "芝麻分就能借",
        img: "https://dummyimage.com/100x100"
      },
      {
        title: "芝麻分就能借",
        caption: "芝麻分就能借",
        img: "https://dummyimage.com/100x100"
      },
      {
        title: "芝麻分就能借",
        caption: "芝麻分就能借",
        img: "https://dummyimage.com/100x100"
      },
      {
        title: "芝麻分就能借",
        caption: "芝麻分就能借",
        img: "https://dummyimage.com/100x100"
      },
      {
        title: "芝麻分就能借",
        caption: "芝麻分就能借",
        img: "https://dummyimage.com/100x100"
      }
    ],
    RankingList: {
      type: "急速贷排行榜",
      new: "最新",
      hot: "最热",
      list: [
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/65x65"
        },
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/65x65"
        },
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/65x65"
        },
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/65x65"
        },
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/65x65"
        }
      ]
    }
  };
  render() {
    const { typeList, RankingList } = this.state;
    return (
      <Layout title="首页">
        <div className="flex box jc-between bg-white">
          {typeList &&
            typeList.length > 0 &&
            typeList.map(item => <HomeType key={uuid()} item={item} />)}
        </div>
        <HomeRankingList RankingList={RankingList} />
      </Layout>
    );
  }
}

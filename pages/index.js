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
<<<<<<< HEAD
        <div className="flex box jc-between bg-white">
          {typeList &&
            typeList.length > 0 &&
            typeList.map(item => <HomeType key={uuid()} item={item} />)}
        </div>
        <div>
          {RankingList &&
            RankingList.list.length > 0 && (
              <HomeRankingList RankingList={RankingList} />
            )}
        </div>
=======
        <Button type="primary">hello world</Button>
        <div>test2</div>
        <h1>nihao</h1>
        <h1>nihao2</h1>
>>>>>>> aad721077f8c1a9bca36af2d571bbda72ba04f53
      </Layout>
    );
  }
}

import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel } from "antd";
import uuid from "uuid/v4";
import reduxPage from "@reduxPage";
import { Layout, HomeOnlineLoans, HomeCityselection, HomeType, HomeForm } from "@components";

@reduxPage
@connect(({ home }) => ({ home }))
export default class extends Component {
  state = {
    rankingList: {
      type: "急速贷排行榜",
      new: "最新",
      hot: "最热",
      list: [
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/68x68"
        },
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/68x68"
        },
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/68x68"
        },
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/68x68"
        }
      ]
    },
    onlineLoans: {
      type: "在线极速贷",
      num: "拍拍贷",
      type2: "最高可借20万，当天放款",
      qrcode: "https://dummyimage.com/22x22",
      carouselList: [
        "https://dummyimage.com/200x125",
        "https://dummyimage.com/200x125",
        "https://dummyimage.com/200x125",
        "https://dummyimage.com/200x125",
      ],
      list: [
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/68x68"
        },
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/68x68"
        },
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/68x68"
        },
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/68x68"
        },
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/68x68"
        },
        {
          title: "拍拍贷",
          number: "2013人申请",
          content: "3分钟申请,2小时审核,秒过",
          img: "https://dummyimage.com/68x68"
        }
      ]
    },
    citySelection: {
      type: "同城精选贷款",
      header: {
        title: "车抵贷",
        content: "不限车龄,评估价九成批款，材料简单"
      },
      list: [
        {
          title: "车抵贷",
          content: "不限车龄,评估价九成批款，材料简单"
        },
        {
          title: "车抵贷",
          content: "不限车龄,评估价九成批款，材料简单"
        },

        {
          title: "车抵贷",
          content: "不限车龄,评估价九成批款，材料简单"
        },

        {
          title: "车抵贷",
          content: "不限车龄,评估价九成批款，材料简单"
        }
      ]
    }
  };
  render() {
    const { rankingList } = this.state;
    const { onlineLoans } = this.state;
    const { citySelection } = this.state;
    const typeList = [
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
    ]
    return (
      <Layout title="首页">
        <div className="relative">
          <HomeForm />
          <Carousel
            className="home-carousel"
            autoplay
          >
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
        <div style={{ height: "225px" }} />
        <HomeOnlineLoans rankingList={rankingList} onlineLoans={onlineLoans} />
        <HomeCityselection citySelection={citySelection} rankingList={rankingList} />
      </Layout>
    )
  }
}

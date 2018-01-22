import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel } from "antd";
import uuid from "uuid/v4";
import reduxPage from "@reduxPage";
import { Layout, HomeType } from "@components";

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
        img: "http://dummyimage.com/100x100"
      },
      {
        title: "标题1",
        caption: "副标题",
        img: "http://dummyimage.com/100x100"
      }
    ]
  };
  render() {
    const { typeList } = this.state;
    return (
      <Layout title="首页">
        <Carousel afterChange={e => console.info(e)} className="home-carousel">
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
        <div className="flex jc-between bg-white box">
          {typeList.map(item => <HomeType key={uuid()} item={item} />)}
        </div>
      </Layout>
    );
  }
}

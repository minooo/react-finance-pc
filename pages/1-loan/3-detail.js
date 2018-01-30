import React, { Component } from "react";
import { Layout } from "@components"

const echarts = require("../../static/scripts/echarts.min.js");

export default class extends Component {
  static getInitialProps({ query: { id } }) {
    return { id };
  }
  state = {};
  componentDidMount() {
    this.initCharts(this.option);
  }
  initCharts = opt => {
    echarts.init(this.echartBox).setOption(opt);
  };
  option = {
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["100%", "75%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 4
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" }
        ]
      }
    ]
  };
  render() {
    const { id } = this.props
    return (
      <Layout title="登陆">
        您当前访问的产品id是：{id}
        <div
          style={{ width: "600px", height: "400px" }}
          ref={ele => (this.echartBox = ele)}
        />
      </Layout>
    );
  }
}

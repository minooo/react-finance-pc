import React, { Component, Fragment } from "react";
import uuid from "uuid/v4";
import { Icon } from "antd";
import { MeSelection, Btn, AlertBg } from "@components";

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { pathname } = ctx;
    return { pathname };
  }
  state = {
    detailed: {},
    visible: false,
    applylist: [
      {
        name: "快速申请1",
        money: "6万",
        time: "2017-080-24 10:57:55",
        type: "ing",
        detailed: {
          name: "快速申请1",
          time: "2017-080-24 10:57:55",
          money: "6万",
          type: "房型贷款",
          time_limit: "一个月",
          repayment_time: "3天以内"
        }
      },
      {
        name: "快速申请2",
        money: "6万",
        time: "2017-080-24 10:57:55",
        type: "close",
        detailed: {
          name: "快速申请2",
          time: "2017-080-24 10:57:55",
          money: "6万",
          type: "房型贷款",
          time_limit: "一个月",
          repayment_time: "3天以内"
        }
      },
      {
        name: "快速申请3",
        money: "6万",
        time: "2017-080-24 10:57:55",
        type: "success",
        detailed: {
          name: "快速申请3",
          time: "2017-080-24 10:57:55",
          money: "6万",
          type: "房型贷款",
          time_limit: "一个月",
          repayment_time: "3天以内"
        }
      },
      {
        name: "快速申请4",
        money: "6万",
        time: "2017-080-24 10:57:55",
        type: "ing",
        detailed: {
          name: "快速申请4",
          time: "2017-080-24 10:57:55",
          money: "6万",
          type: "房型贷款",
          time_limit: "一个月",
          repayment_time: "3天以内"
        }
      }
    ]
  }
  showModal = (pre) => {
    this.setState({
      visible: true,
      detailed: pre
    });
  }
  closeModal = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { pathname } = this.props
    const { visible, applylist, detailed } = this.state
    return (
      <MeSelection pathname={pathname}>
        <div className="relative w-100 h-100" style={{ paddingTop: "50px", paddingLeft: "45px" }}>
          <div style={{ width: "920px" }}>
            <div className="h66 pl20 flex ai-center font16 c333" style={{ backgroundColor: "#edf2f8" }}>
              <div style={{ width: "200px" }}>申请产品</div>
              <div style={{ width: "155px" }}>贷款金额</div>
              <div style={{ width: "260px" }}>贷款时间</div>
              <div style={{ width: "190px" }}>申请状态</div>
              <div className="equal">操作</div>
            </div>
            {
              applylist && applylist.length > 0 && applylist.map((item, index) => (
                <div
                  className="flex h60 pl20 flex ai-center c333 font14"
                  key={uuid()}
                  style={{ backgroundColor: `${index % 2 === 0 ? "#fff" : "#f5f7fa"}` }}
                >
                  <div className="text-overflow-1 pr10" style={{ width: "200px" }}>{item.name}</div>
                  <div className="text-overflow-1 pr10" style={{ width: "155px" }}>{item.money}</div>
                  <div className="text-overflow-1 pr10" style={{ width: "260px" }}>{item.time}</div>
                  {
                    item.type === "ing" ?
                      (
                        <div style={{ width: "190px", color: "#e4393c" }}>
                          <Icon className="pr5" type="clock-circle-o" />进行中
                        </div>
                      )
                      : (
                        item.type === "success" ?
                          (
                            <div style={{ width: "190px", color: "#71b247" }}>
                              <Icon className="pr5" type="check-circle-o" />已成功
                            </div>
                          )
                          :
                          (
                            <div className="c999" style={{ width: "190px" }}>
                              <Icon className="pr5" type="close-circle-o" />已关闭
                            </div>
                          )
                      )
                  }
                  <Btn onClick={() => this.showModal(item.detailed)} className="c-main" con="查看详情" />
                </div>
              ))
            }
          </div>
          {/* 弹出框 */}
          {
            visible ?
              <Fragment>
                <AlertBg />
                <div className="bg-white absolute z-index100" style={{ left: "0px", bottom: "70px", width: "820px", height: "308px" }}>
                  <div className="h62 flex ai-center jc-between" style={{ backgroundColor: "#edf2f8" }}>
                    <div className="font16 c333 pl30 bold">申请详情</div>
                    <Btn con={<Icon type="close" />} onClick={this.closeModal} className="c999 font18 mr30" />
                  </div>
                  <div className="flex ai-center jc-center bg-white font14" style={{ height: "246px" }}>
                    <div style={{ border: "1px solid #f2f2f2" }}>
                      <div className="flex h56">
                        <div
                          className="c666 flex ai-center jc-center border-right border-bottom-one"
                          style={{ width: "160px", backgroundColor: "#fafafa" }}
                        >
                          贷款产品
                        </div>
                        <div
                          className="c333 flex ai-center jc-center border-right border-bottom-one"
                          style={{ width: "220px" }}
                        >
                          <span className="text-overflow-1 plr10">{detailed.name}</span>
                        </div>
                        <div
                          className="c666 flex ai-center jc-center border-right border-bottom-one"
                          style={{ width: "160px", backgroundColor: "#fafafa" }}
                        >发布时间
                        </div>
                        <div
                          className="c333 flex ai-center jc-center border-bottom-one"
                          style={{ width: "220px" }}
                        >
                          <span className="text-overflow-1 plr10">{detailed.time}</span>
                        </div>
                      </div>
                      <div className="flex h56">
                        <div
                          className="c666 flex ai-center jc-center border-right border-bottom-one"
                          style={{ width: "160px", backgroundColor: "#fafafa" }}
                        >贷款额度
                        </div>
                        <div
                          className="c333 flex ai-center jc-center border-right border-bottom-one"
                          style={{ width: "220px" }}
                        >
                          <span className="text-overflow-1 plr10">{detailed.money}</span>
                        </div>
                        <div
                          className="c666 flex ai-center jc-center border-right border-bottom-one"
                          style={{ width: "160px", backgroundColor: "#fafafa" }}
                        >贷款类型
                        </div>
                        <div
                          className="c333 flex ai-center jc-center border-bottom-one"
                          style={{ width: "220px" }}
                        >
                          <span className="text-overflow-1 plr10">{detailed.type}</span>
                        </div>
                      </div>
                      <div className="flex h56">
                        <div
                          className="c666 flex ai-center jc-center border-right border-bottom-one"
                          style={{ width: "160px", backgroundColor: "#fafafa" }}
                        >贷款期限
                        </div>
                        <div
                          className="c333 flex ai-center jc-center border-right border-bottom-one"
                          style={{ width: "220px" }}
                        >
                          <span className="text-overflow-1 plr10">{detailed.time_limit}</span>
                        </div>
                        <div
                          className="c666 flex ai-center jc-center border-right border-bottom-one"
                          style={{ width: "160px", backgroundColor: "#fafafa" }}
                        >需款时间
                        </div>
                        <div
                          className="c333 flex ai-center jc-center border-bottom-one"
                          style={{ width: "220px" }}
                        >
                          <span className="text-overflow-1 plr10">{detailed.repayment_time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
              : null
          }
        </div>
      </MeSelection>
    )
  }
}

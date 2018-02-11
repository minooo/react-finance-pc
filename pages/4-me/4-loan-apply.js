import React, { Component } from "react";
import uuid from "uuid/v4";
import { MeSelection, MeloanApplyList, MeLoanAlert, NoData } from "@components";

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
      {/* 先判断有无数据 */}
        {
          applylist && (applylist.length > 0) ?
            <div className="relative w-100 h-100" style={{ paddingTop: "50px", paddingLeft: "45px" }}>
              <div style={{ width: "920px" }}>
              {/* 题头 */}
                <div className="h66 pl20 flex ai-center font16 c333" style={{ backgroundColor: "#edf2f8" }}>
                  <div style={{ width: "200px" }}>申请产品</div>
                  <div style={{ width: "155px" }}>贷款金额</div>
                  <div style={{ width: "260px" }}>贷款时间</div>
                  <div style={{ width: "190px" }}>申请状态</div>
                  <div className="equal">操作</div>
                </div>
                {
                  applylist.map((item, index) => (
                    <MeloanApplyList showModal={this.showModal} index={index} item={item} key={uuid()} />
                  ))
                }
              </div>

              {/* 弹出框 */}
              {
                visible && <MeLoanAlert closeModal={this.closeModal} detailed={detailed} />
              }
            </div>
            :
            <NoData
              caption="你没有贷款申请记录"
            />
        }
      </MeSelection>
    )
  }
}

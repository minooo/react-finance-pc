import React from "react";
import uuid from "uuid/v4";
import { Icon } from "antd";
import { Btn, WrapLink } from "@components";

export default class extends React.Component {
  state = { type: "hot", list: this.props.rankingList.list };
  handClickNew = () => {
    this.setState(() => ({
      type: "new",
      list: this.props.rankingList.newlist
    })

    )
  }
  handClickHot = () => {
    this.setState(() => ({
      type: "hot",
      list: this.props.rankingList.list
    }))
  }
  render() {
    const { rankingList, loantype } = this.props
    const { type, list } = this.state
    return (
      <div
        className="plr20 pt20 bg-white font14 home-shdow-mid"
        style={{ height: "520px" }}
      >
        <div className="flex jc-between ai-center">
          <div className="font22 c333 lh100 bold">{rankingList.type}</div>
          <div className="font16 c666 flex">
            <Btn onClick={this.handClickNew} con={<span className={`mr5 pointer ${type === "new" ? "c-main" : "c333"}`}>{rankingList.new}</span>} />
            <span>|</span>
            <Btn onClick={this.handClickHot} con={<span className={`ml5 pointer ${type === "hot" ? "c-main" : "c333"}`}>{rankingList.hot}</span>} />
          </div>
        </div>
        <div className={`h20 mb10 ${loantype === "city" ? "home-loancity-bg" : "home-loanlist-bg"}`} />
        {list && list.length > 0 && list.map(item => (
          <WrapLink href="/index" as="/" key={uuid()} className="text-left">
            <div className="flex mb10 pl10 pt20 pb15 pr20 h100 home-loanlist-hover pointer" style={{ width: "300px" }}>
              <div className="w66 h66 img-bg">
                <img
                  className="w-100 h-100"
                  src={item.img}
                  alt=""
                />
              </div>
              <div className="flex equal jc-between pl15">
                <div className="flex column jc-between c333 font12">
                  <div className="flex font16 lh120 text-overflow-1 bold">
                    {item.title}
                  </div>
                  <div className="lh120 text-overflow-1">
                    <span className="c-main">{item.number}</span>申请
                  </div>
                  <div className="font12 lh120 text-overflow-1">{item.content}</div>
                </div>
                <div className="flex ai-center c999">
                  <Icon type="right" style={{ fontSize: 14 }} />
                </div>
              </div>
            </div>
          </WrapLink>
        ))
        }
      </div>
    )
  }
}

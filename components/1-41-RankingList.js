import uuid from "uuid/v4";
import { Icon } from "antd";
import React from "react";
import { Btn, WrapLink } from "@components";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handClickNew = this.handClickNew.bind(this)
    this.handClickHot = this.handClickHot.bind(this)
    this.state = { type: "hot" };
  }
  handClickNew() {
    this.setState({
      type: "new"
    })
  }
  handClickHot() {
    this.setState({
      type: "hot"
    })
  }
  render() {
    const { rankingList } = this.props
    const { type } = this.state
    return (
      <div
        className="plr20 pt20 bg-white font14"
        style={{ height: "520px" }}
      >
        <div className="flex jc-between ai-center">
          <div className="font22 c333 lh100">{rankingList.type}</div>
          <div className="font16 c666 flex">
            <Btn onClick={this.handClickNew} con={<span className={`mr5 pointer ${type === "new" ? "c-main" : "c333"}`}>{rankingList.new}</span>} />
            <span>|</span>
            <Btn onClick={this.handClickHot} con={<span className={`ml5 pointer ${type === "hot" ? "c-main" : "c333"}`}>{rankingList.hot}</span>} />
          </div>
        </div>
        <div className="h20 mb10 home-loan-list" />

        {rankingList.list.map(item => (
          <WrapLink key={uuid()}>
            <div className="flex mb10 pl10 pt20 pb15 pr20 h100" style={{ width: "300px" }}>
              <div>
                <img
                  src={item.img}
                  alt=""
                />
              </div>
              <div className="flex equal jc-between pl15">
                <div className="flex column jc-between c333 font12">
                  <div className="flex font16 lh100">
                    {item.title}
                  </div>
                  <div>
                    <span className="c-main">{item.number}</span>申请
                  </div>
                  <div className="font12 lh100">{item.content}</div>
                </div>
                <div className="flex ai-center">
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

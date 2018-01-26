import React from "react";
import uuid from "uuid/v4";
import { Btn } from "@components";

export default class extends React.Component {
  state = { ranktype: "new" };
  handClick = (type) => {
    if (type === "hot") {
      this.setState(() => ({
        ranktype: type,
      }));
    } else {
      this.setState(() => ({
        ranktype: type,
      }));
    }
  }
  render() {
    const { loantype, children } = this.props;
    const { ranktype } = this.state;
    const list = ranktype === "new" ? this.props.rankingList.list : this.props.rankingList.newlist
    return (
      <div
        className="plr20 pt20 bg-white font14 home-shdow-mid"
        style={{ height: "520px" }}
      >
        <div className="flex jc-between ai-center">
          <div className="font22 c333 lh100 bold">{loantype === "city" ? "同城贷排行榜" : "极速贷排行榜"}</div>
          <div className="font16 c666 flex">
            <Btn
              onClick={() => this.handClick("new")}
              con={
                <span
                  className={`mr5 pointer ${
                    ranktype === "new" ? "c-main" : "c333"}`}
                >
                  最新
                </span>
              }
            />
            <span>|</span>
            <Btn
              onClick={() => this.handClick("hot")}
              con={
                <span
                  className={`ml5 pointer ${
                    ranktype === "hot" ? "c-main" : "c333"}`}
                >
                  最热
                </span>
              }
            />
          </div>
        </div>
        <div
          className={`h20 mb10 ${
            loantype === "city" ? "home-loancity-bg" : "home-loanlist-bg"}`}
        />

        {
          list &&
          list.length > 0 &&
          list.map(item => <children item={item} />)
        }
      </div>
    );
  }
}

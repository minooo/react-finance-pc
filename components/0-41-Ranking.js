import React, { Component, Fragment } from "react";
import { Btn } from "@components";

export default class extends Component {
  state = {
    isNew: true
  };
  onSwitch = v => {
    this.setState(() => ({ isNew: v === "isNew" }));
  };
  render() {
    const { title, bg, list, othList } = this.props;
    const { isNew } = this.state;
    return (
      <Fragment>
        <div className="flex jc-between ai-center">
          <div className="font22 c333 lh100 bold">{title}</div>
          <div className="font16 c666 flex">
            <Btn
              onClick={() => this.onSwitch("isNew")}
              con={
                <span className={`mr5 pointer ${isNew ? "c-main" : "c333"}`}>
                  最新
                </span>
              }
            />
            <span>|</span>
            <Btn
              onClick={this.onSwitch}
              con={
                <span className={`ml5 pointer ${!isNew ? "c-main" : "c333"}`}>
                  最热
                </span>
              }
            />
          </div>
        </div>
        <div className={`h20 mb10 ${bg}`} />
        {isNew ? list : othList}
      </Fragment>
    );
  }
}

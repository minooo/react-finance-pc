import React, { Component } from "react";
import { WrapLink } from "@components";

export default class extends Component {
  state = { isOnOver: false };
  onSwitch = () => {
    this.setState(pre => ({ isOnOver: !pre.isOnOver }));
  };
  render() {
    const { isOnOver } = this.state;
    return (
      <div style={{ background: "#f8f8f8" }}>
        <div className="box h30 flex jc-between ai-center relative hom-top-code">
          {isOnOver && (
            <div
              style={{
                position: "absolute",
                zIndex: 10,
                top: "40px",
                right: 0
              }}
              className="w120 h120 bg-white ptb10 plr10 home-shdow-sm r2"
            >
              <img src="http://dummyimage.com/100x100" alt="" />
            </div>
          )}
          <WrapLink className="c666 pl15 home-top-city-bg" href="/city" as="/city">
            郑州[切换]
          </WrapLink>
          <div className="flex ai-center">
            <span style={{ marginRight: "70px" }}>客服热线：400-968-8821</span>
            <WrapLink className="font12 c-main mr30" href="/4-me/1-login" as="/login">
              登录
            </WrapLink>
            <span onMouseEnter={this.onSwitch} onMouseLeave={this.onSwitch}>
              手机站
            </span>
          </div>
        </div>
      </div>
    );
  }
}

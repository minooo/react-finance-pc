import React, { Component, Fragment } from "react";
import Router from "next/router";
import { delCookie } from "@utils";
import { WrapLink, Btn } from "@components";

export default class extends Component {
  state = { isOnOver: false };
  onSwitch = () => {
    this.setState(pre => ({ isOnOver: !pre.isOnOver }));
  };
  onClick = () => {
    delCookie("token");
    Router.replace({ pathname: "/4-me/1-login" }, "/login");
  };
  render() {
    const { isOnOver } = this.state;
    const { me, city } = this.props;
    return (
      <div className="bg-body">
        <div className="box h30 flex jc-between ai-center relative hom-top-code bg-body">
          {isOnOver && (
            <div
              style={{
                position: "absolute",
                zIndex: 10,
                top: "40px",
                right: 0
              }}
              className="w120 h120 bg-white ptb5 plr5 home-shdow-sm r2"
            >
              <div className="w110 h110 code-bg" />
            </div>
          )}
          <WrapLink
            className="c666 pl15 home-top-city-bg"
            href="/city"
            as="/city"
          >
            {city}[切换]
          </WrapLink>
          <div className="flex ai-center">
            <span style={{ marginRight: "30px" }}>客服热线：400-968-8821</span>
            <span style={{ marginRight: "35px" }}>招商热线：13693719740</span>
            {me ? (
              <Fragment>
                <WrapLink
                  className="font12 c-main mr15"
                  href="/4-me/2-home"
                  as="/me"
                >
                  {me}
                </WrapLink>
                <Btn btnClass="font12 mr30" con="退出" onClick={this.onClick} />
              </Fragment>
            ) : (
              <WrapLink
                className="font12 c-main mr30"
                href="/4-me/1-login"
                as="/login"
              >
                登录
              </WrapLink>
            )}
            <span onMouseEnter={this.onSwitch} onMouseLeave={this.onSwitch}>
              手机站
            </span>
          </div>
        </div>
      </div>
    );
  }
}

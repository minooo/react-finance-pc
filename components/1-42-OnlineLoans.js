import React, { Component, Fragment } from "react";
import uuid from "uuid/v4";
import { Carousel } from "antd";
import { Ranking, WrapLink, HomeRankListItem } from "@components";

export default class extends Component {
  state = {
    isOver: false,
    focus: 0
  };

  handChangeOver = () => {
    this.setState(pre => ({ isOver: !pre.isOver }));
  };
  afterChange = index => {
    this.setState(() => ({
      focus: index
    }));
  };
  render() {
    const { onlineLoans } = this.props;
    const { isOver, focus } = this.state;
    return (
      <div className="box flex">
        <div
          className=" flex column pt25 pl20 pr15 c333  bg-white home-shdow-mid relative mr20"
          style={{ width: "860px", height: "520px" }}
        >
          <div className="home-loan-top">
            <div
              className="home-loantop-text font14 h20 bold"
              style={{ width: "200px" }}
            >
              ONLINE EXTREME LOAN
            </div>
          </div>
          <div className="flex jc-between mb20">
            <div className="font20 c333 lh100 bold">在线极速贷</div>
            <div
              className="flex ai-center relative pointer"
              onMouseEnter={this.handChangeOver}
              onMouseLeave={this.handChangeOver}
            >
              <span className="pr10 font16 le100">扫码进入手机版</span>
              <div className="home-small-qrcode" />
              {isOver && (
                <div
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    top: "32px",
                    left: "16px"
                  }}
                  className="w110 h110 bg-white ptb5 plr5 home-shdow-sm r2"
                >
                  <div className="w100 h100 code-bg" />
                </div>
              )}
            </div>
          </div>
          <div className="flex overflow-h">
            <div className="pr30" style={{ width: "200px" }}>
              {onlineLoans.pop &&
                onlineLoans.pop.length > 0 && (
                  <Fragment>
                    <div
                      className="mb20 overflow-h"
                      style={{ width: "200px", height: "125px" }}
                    >
                      {onlineLoans.pop.length === 1 ? (
                        <WrapLink
                          href={onlineLoans.pop[0].url}
                          style={{ width: "200px", height: "125px" }}
                        >
                          <img
                            className="pointer w-100 h-100"
                            src={onlineLoans.pop[0].thumb}
                            alt=""
                          />
                        </WrapLink>
                      ) : (
                        <Carousel autoplay afterChange={this.afterChange}>
                          {onlineLoans.pop.map(item => (
                            <WrapLink
                              key={uuid()}
                              href={item.url}
                              style={{ width: "200px", height: "125px" }}
                            >
                              <img
                                className="pointer w-100 h-100"
                                src={item.thumb}
                                alt=""
                              />
                            </WrapLink>
                          ))}
                        </Carousel>
                      )}
                    </div>
                    {onlineLoans.pop.length === 1 ? (
                      <div className="text-center mb20">
                        <div className="font16 mb10 lh100 text-overflow-one bold">
                          {onlineLoans.pop[0].name}
                        </div>
                        <div className="font14 lh120 text-overflow-one">
                          {onlineLoans.pop[0].description}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center mb20">
                        <div className="font16 mb10 lh100 text-overflow-one bold">
                          {onlineLoans.pop[focus].name}
                        </div>
                        <div className="font14 lh120 text-overflow-one">
                          {onlineLoans.pop[focus].description}
                        </div>
                      </div>
                    )}
                    <div className="flex jc-center mb20">
                      {onlineLoans.pop.length === 1 ? (
                        <WrapLink
                          style={{ width: "140px" }}
                          className="flex jc-center ai-center bg-main r100 h36 home-shdow-sm font18 c-white lh150 pointer"
                          href={onlineLoans.pop[0].url}
                        >
                          <span className="c-white">免费申请</span>
                        </WrapLink>
                      ) : (
                        <WrapLink
                          style={{ width: "140px" }}
                          className="flex jc-center ai-center bg-main r100 h36 home-shdow-sm font18 c-white lh150 pointer"
                          href={onlineLoans.pop[focus].url}
                        >
                          <span className="c-white">免费申请</span>
                        </WrapLink>
                      )}
                    </div>
                  </Fragment>
                )}
              <div className="text-center lh150 font14 mb15">
                APP下载，享专属优惠
              </div>
              <div className="flex jc-between ai-center">
                <div className="w80 h116 app-bg" />
                <div className="w90 h90 app-qrcode-bg" />
              </div>
            </div>
            <div className="flex equal wrap pl5 overflow-h">
              {onlineLoans.default &&
                onlineLoans.default.list &&
                onlineLoans.default.list.length > 0 &&
                onlineLoans.default.list.map(item => (
                  <div style={{ width: "50%" }} key={uuid()}>
                    <HomeRankListItem
                      item={item}
                      isrank={false}
                      isRight="true"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="equal overflow-h z-index10 home-shdow-mid">
          <div
            className="plr20 pt20 bg-white font14"
            style={{ height: "520px" }}
          >
            <Ranking
              title="极速贷排行榜"
              bg="home-loanlist-bg"
              list={
                onlineLoans.new &&
                onlineLoans.new.list &&
                onlineLoans.new.list.length > 0 &&
                onlineLoans.new.list.map(item => (
                  <HomeRankListItem
                    key={uuid()}
                    item={item}
                    isrank
                    isRight="true"
                  />
                ))
              }
              othList={
                onlineLoans.heat &&
                onlineLoans.heat.list &&
                onlineLoans.heat.list.length > 0 &&
                onlineLoans.heat.list.map(item => (
                  <HomeRankListItem
                    key={uuid()}
                    item={item}
                    isrank
                    isRight="true"
                  />
                ))
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

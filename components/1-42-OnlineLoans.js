import React, { Component, Fragment } from "react";
import uuid from "uuid/v4";
import { Carousel, Icon } from "antd";
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
          className="mt20 flex column pt25 pl20 pr15 c333 mb20 bg-white home-shdow-mid relative"
          style={{ width: "860px", height: "480px" }}
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
              <Icon type="qrcode" style={{ fontSize: 22 }} />
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
            <div className="pr30">
<<<<<<< HEAD
              <div
                className="mb20 overflow-h"
                style={{ width: "200px", height: "125px" }}
              >
                <Carousel autoplay afterChange={this.afterChange}>
                  {onlineLoans.carouselList.map(({ img, href }) => (
                    <WrapLink href={href} key={uuid()}>
                      <img className="pointer" src={img} alt="" />
                    </WrapLink>
                  ))}
                </Carousel>
              </div>
              <div className="text-center mb20">
                <div className="font16 mb10 lh100 text-overflow-1 bold">
                  {onlineLoans.carouselList[focus].title}
                </div>
                <div className="font14 lh120 text-overflow-1">
                  {onlineLoans.carouselList[focus].content}
                </div>
              </div>
              <div className="flex jc-center mb20">
                <Btn
                  con={
                    <span className="block font18 c-white lh150 pointer">
                      免费申请
                    </span>
                  }
                  className="flex jc-center ai-center bg-main r100 h36 home-shdow-sm"
                  style={{ width: "140px" }}
                  href={onlineLoans.carouselList[focus].href}
                />
              </div>
=======
              {onlineLoans.pop &&
                onlineLoans.pop.list &&
                onlineLoans.pop.list.length > 0 && (
                  <Fragment>
                    <div
                      className="mb20 overflow-h"
                      style={{ width: "200px", height: "125px" }}
                    >
                      <Carousel autoplay afterChange={this.afterChange}>
                        {onlineLoans.pop.list.map(item => (
                          <WrapLink
                            key={uuid()}
                            href={`/1-loan/3-detail?id=${item.id}`}
                            as={`/loan/${item.id}`}
                          >
                            <img className="pointer" src={item.thumb} alt="" />
                          </WrapLink>
                        ))}
                      </Carousel>
                    </div>
                    <div className="text-center mb20">
                      <div className="font16 mb10 lh100 text-overflow-1 bold">
                        {onlineLoans.pop.list[focus].name}
                      </div>
                      <div className="font14 lh120 text-overflow-1">
                        {onlineLoans.pop.list[focus].description}
                      </div>
                    </div>
                    <div className="flex jc-center mb20">
                      <WrapLink
                        style={{ width: "140px" }}
                        className="flex jc-center ai-center bg-main r100 h36 home-shdow-sm font18 c-white lh150 pointer"
                        href={`/1-loan/3-detail?id=${
                          onlineLoans.pop.list[focus].id
                        }`}
                        as={`/loan/${onlineLoans.pop.list[focus].id}`}
                      >
                        <span className="c-white">免费申请</span>
                      </WrapLink>
                    </div>
                  </Fragment>
                )}
>>>>>>> master
              <div className="text-center lh150 font14 mb15">
                APP下载，享专属优惠
              </div>
              <div className="flex jc-between ai-center">
                <div className="w80 h116 app-bg" />
                <div className="w90 h90 code-bg" />
              </div>
            </div>
            <div className="flex equal wrap pl5">
              {onlineLoans.default &&
                onlineLoans.default.list &&
                onlineLoans.default.list.length > 0 &&
                onlineLoans.default.list.map(item => (
                  <div style={{ width: "50%" }} key={uuid()}>
                    <HomeRankListItem item={item} isrank={false} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="equal z-index10">
          <div
            className="plr20 pt20 bg-white font14 home-shdow-mid"
            style={{ height: "520px" }}
          >
            <Ranking
              title="急速贷排行榜"
              bg="home-loanlist-bg"
              list={
                onlineLoans.new &&
                onlineLoans.new.list &&
                onlineLoans.new.list.length > 0 &&
                onlineLoans.new.list.map(item => (
                  <HomeRankListItem key={uuid()} item={item} isrank />
                ))
              }
              othList={
                onlineLoans.heat &&
                onlineLoans.heat.list &&
                onlineLoans.heat.list.length > 0 &&
                onlineLoans.heat.list.map(item => (
                  <HomeRankListItem key={uuid()} item={item} isrank />
                ))
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

import React from "react";
import uuid from "uuid/v4";
import { Carousel, Icon } from "antd"
import { HomeRankingList, Btn, WrapLink } from "@components";

export default class extends React.Component {
  state = { isOver: false };
  handChangeOver = () => {
    this.setState(pre => ({ isOver: !pre.isOver }))
  }
  render() {
    const { rankingList, onlineLoans } = this.props
    const { isOver } = this.state
    return (
      <div className="box flex">
        <div className="mt20 flex column pt25 pl20 pr15 c333 mb20 bg-white home-shdow-mid relative" style={{ width: "860px", height: "480px" }}>
          <div className="home-loan-top">
            <div className="home-loantop-text font14 h20 bold" style={{ width: "200px" }}>
              ONLINE EXTREME LOAN
            </div>
          </div>
          <div className="flex jc-between mb20">
            <div className="font20 c333 lh100 bold">{onlineLoans.type}</div>
            <div className="flex ai-center relative pointer" onMouseEnter={this.handChangeOver} onMouseLeave={this.handChangeOver}>
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
                  <img src="http://dummyimage.com/100x100" alt="" />
                </div>
              )}
            </div>
          </div>
          <div className="flex overflow-h">
            <div className="pr30">
              <div className="mb20 overflow-h" style={{ width: "200px", height: "125px" }}>
                <Carousel autoplay >
                  {onlineLoans.carouselList &&
                    onlineLoans.carouselList &&
                    onlineLoans.carouselList.length > 0 && (
                      onlineLoans.carouselList.map((src) => <img className="pointer" key={uuid()} src={src} alt="" />)
                    )}
                </Carousel>
              </div>
              <div className="text-center mb20">
                <div className="font16 mb10 lh100 text-overflow-1 bold">{onlineLoans.num}</div>
                <div className="font12 lh120 text-overflow-1">{onlineLoans.type2}</div>
              </div>
              <div className="flex jc-center mb20">
                <Btn con={<span className="block font18 c-white lh150 pointer">免费申请</span>} className="flex jc-center ai-center bg-main r12 h36" style={{ width: "140px" }} />
              </div>
              <div className="text-center lh100 font14 mb20">
                APP下载，享专属优惠
              </div>
              <div className="flex jc-between ai-center">
                <div className="w80 h116 img-bg">
                  <img src="../static/images/home_loah_phone.png" className="w-100 h-100" alt="" />
                </div>
                <div className="w90 h90 img-bg">
                  <img src="../static/images/home_loah_ qrcode.png" alt="" className="w-100 h-100" />
                </div>
              </div>
            </div>
            <div className="flex equal wrap pl5">
              {onlineLoans &&
                onlineLoans.list &&
                onlineLoans.list.length > 0 &&
                onlineLoans.list.map((item) => (
                  <WrapLink href="/index" as="/" key={uuid()} style={{ width: "50%" }} className="block">
                    <div className="flex mb10 pl10 pt20 pb15 pr15 home-loanlist-hover h100 pointer">
                      <div className="h66 w66 img-bg">
                        <img
                          className="w-100 h-100"
                          src={item.img}
                          alt=""
                        />
                      </div>
                      <div className="flex equal jc-between pl15">
                        <div className="flex column jc-between c333 font12">
                          <div className="flex font16 lh120 bold text-overflow-1">
                            {item.title}
                          </div>
                          <div className="lh120 text-overflow-1">申请</div>
                          <div className="font12 c-second lh120 text-overflow-1">{item.content}</div>
                        </div>
                        <div className="flex ai-center c999">
                          <Icon type="right" style={{ fontSize: 14 }} />
                        </div>
                      </div>
                    </div>
                  </WrapLink>
                ))}
            </div>
          </div>
        </div>
        <div className="equal">
          {rankingList && (
            <HomeRankingList rankingList={rankingList} />
          )}
        </div>
      </div>
    )
  }
}


import { HomeRankingList, Btn } from "@components";
import { Carousel, Icon } from "antd"
import uuid from "uuid/v4";
import React from "react";


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handOver = this.handOver.bind(this)
    this.handOut = this.handOut.bind(this)
    this.state = { isOver: false };
  }

  handOver() {
    this.setState({
      isOver: true
    })
  }
  handOut() {
    this.setState({
      isOver: false
    })
  }
  render() {
    const { rankingList, onlineLoans } = this.props
    const { isOver } = this.state
    return (
      <div className="box flex lh120" style={{ marginBottom: "100px" }}>
        <div className="mt20 pt25 pl20 pr15 c333 mb20 bg-white" style={{ width: "860px", height: "480px" }}>
          <div className="flex jc-between mb20">
            <div className="font20 c333">{onlineLoans.type}</div>
            <div className="flex ai-center relative" onMouseEnter={this.handOver} onMouseLeave={this.handOut}>
              <span className="pr10">扫码进入手机版</span>
              <Icon type="qrcode" style={{ fontSize: 22 }} />
              { isOver ? <img className="home-online-pctop" src="https://dummyimage.com/110x110" alt="" style={{ width: "110px", position: "absolute", top: "40px" }} /> : null }
            </div>
          </div>
          <div className="flex">
            <div className="pr30">
              <div className="mb20 overflow-h" style={{ width: "200px", height: "125px" }}>
                <Carousel autoplay >
                  {onlineLoans.carouselList &&
                    onlineLoans.carouselList.length > 0 && (
                      onlineLoans.carouselList.map((src) => <img key={uuid()} src={src} alt="" />)
                    )}
                </Carousel>
              </div>
              <div className="text-center mb20">
                <div className="font16 mb10">{onlineLoans.num}</div>
                <div className="font14">{onlineLoans.type2}</div>
              </div>
              <div className="flex jc-center mb20">
                <Btn con={<span className="block font18 c-white lh150">免费申请</span>} className="flex jc-center ai-center bg-main r12 h36" style={{ width: "140px" }} />
              </div>
              <div className="text-center font14 mb20">
                <p>APP下载，享专属优惠</p>
              </div>
              <div className="flex jc-between ai-center">
                <img src="https://dummyimage.com/80x115" style={{ width: "80px", height: "115px" }} alt="" />
                <img src="https://dummyimage.com/90x90" alt="" style={{ width: "90px", height: "90px" }} />
              </div>
            </div>
            <div className="flex wrap pl5">
              {onlineLoans.list.map((item) => (
                <div key={uuid()} className="flex mb10 pl10 pt20 pr15" style={{ width: "295px", height: "100px" }}>
                  <div>
                    <img
                      src={item.img}
                      alt=""
                    />
                  </div>
                  <div className="flex equal jc-between pl15">
                    <div className="flex column jc-around c333 font12">
                      <div className="flex font16">
                        {item.title}
                      </div>
                      <div>申请</div>
                      <div className="font12 c-second">{item.content}</div>
                    </div>
                    <div className="flex ai-center">
                      <Icon type="right" style={{ fontSize: 14 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          {rankingList &&
            rankingList.list.length > 0 && (
              <HomeRankingList rankingList={rankingList} />
            )}
        </div>
      </div>
    )
  }
}


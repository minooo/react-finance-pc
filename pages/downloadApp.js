import React, { Component } from "react";
import TweenOne from "rc-tween-one";
import QueueAnim from "rc-queue-anim";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import uuid from "uuid/v4";
import { Icon } from "antd";
import { Layout, WrapLink } from "@components";

export default class extends Component {
  state = {};
  render() {
    return (
      <Layout footNoShow title="App下载">
        {/* 全新上线 */}
        <OverPack
          replay
          playScale={[0.5, 0.8]}
          key={uuid()}
          className="app-one-bg"
          style={{ height: "820px" }}
        >
          <div
            key={uuid()}
            className="box c-white flex"
            style={{ paddingLeft: "50px", paddingRight: "50px" }}
          >
            <div key={uuid()} style={{ paddingTop: "236px" }}>
              <QueueAnim
                type="left"
                key={uuid()}
                animConfig={{ x: [0, -300], opacity: [1, 0], duration: 1000 }}
                ease={["easeInOutCubic", "easeInOutCubic"]}
              >
                <div
                  key={uuid()}
                  className="lh100"
                  style={{ fontSize: "54px", marginBottom: "50px" }}
                >
                  嘟嘟e融 V1.0全新上线
                </div>
                <div key={uuid()} className="font36 lh100 flex">
                  <div className="pr30">一站式贷款超市</div>
                  <div>人人都能贷到钱</div>
                </div>
              </QueueAnim>
              <div key={uuid()} className="h114" />
              <QueueAnim
                className="flex"
                type="bottom"
                key={uuid()}
                leaveReverse
                animConfig={{ y: [0, 200], opacity: [1, 0], duration: 800 }}
                ease={["easeInOutCubic", "easeInOutCubic"]}
              >
                <div
                  key={uuid()}
                  className="app-qrcode-bg mr30"
                  style={{ width: "144px", height: "144px" }}
                />
                <div key={uuid()} className="flex column jc-between">
                  <div
                    className="h58 flex ai-center r100 jc-center "
                    style={{ width: "248px", border: "1px solid #fff" }}
                  >
                    <Icon
                      type="android"
                      style={{ fontSize: 32, color: "#fff" }}
                    />
                    <div className="c-white font24 pl15">安卓版下载</div>
                  </div>
                  <div
                    className="h58 flex ai-center jc-center r100"
                    style={{ width: "248px", border: "1px solid #fff" }}
                  >
                    <Icon
                      type="apple"
                      style={{ fontSize: 32, color: "#fff" }}
                    />
                    <div className="c-white font24 pl15">苹果版下载</div>
                  </div>
                </div>
              </QueueAnim>
            </div>
            <div className="relative" style={{ height: "820px" }}>
              <TweenOne
                key={uuid()}
                animation={{
                  x: "=300",
                  opacity: 0,
                  type: "from",
                  ease: "easeOutQuad",
                  duration: 600
                }}
                className="app-phone-one absolute z-index10"
                style={{
                  width: "283px",
                  height: "600px",
                  left: "100px",
                  bottom: "110px"
                }}
              />
              <TweenOne
                key={uuid()}
                animation={{
                  x: "=300",
                  opacity: 0,
                  type: "from",
                  ease: "easeOutQuad",
                  duration: 500,
                  delay: 500
                }}
                className="app-phone-two absolute"
                style={{
                  width: "253px",
                  height: "534px",
                  left: "296px",
                  bottom: "110px"
                }}
              />
            </div>
          </div>
        </OverPack>
        {/* 我要贷 */}
        <OverPack
          replay
          playScale={[0.5, 0.8]}
          key={uuid()}
          style={{
            height: "820px",
            backgroundColor: "#edf8ff",
            overflow: "hidden"
          }}
        >
          <div
            key={uuid()}
            className="box flex"
            style={{ paddingLeft: "60px" }}
          >
            <TweenOne
              key={uuid()}
              className="app-phone-three"
              style={{ height: "806px", width: "380px", marginTop: "145px" }}
              animation={{
                y: "-=140",
                opacity: 0,
                type: "from",
                ease: "easeOutQuad",
                duration: 1000
              }}
            />
            <div
              key={uuid()}
              className="equal relative"
              style={{ height: "820px" }}
            >
              <TweenOne
                key={uuid()}
                animation={{
                  y: "-=280",
                  opacity: 0,
                  type: "from",
                  ease: "easeInExpo",
                  duration: 1000
                }}
                className="absolute app-mark-one"
                style={{
                  width: "177px",
                  height: "154px",
                  left: "95px",
                  top: "295px"
                }}
              />
              <TweenOne
                animation={{
                  x: "=280",
                  opacity: 0,
                  type: "from",
                  ease: "easeInExpo",
                  duration: 800,
                  delay: 500
                }}
                key={uuid()}
                className="absolute lh100"
                style={{
                  fontSize: "52px",
                  color: "#000",
                  left: "225px",
                  top: "390px"
                }}
              >
                我要贷&nbsp;&nbsp;&nbsp;填写资料
              </TweenOne>
              <TweenOne
                key={uuid()}
                animation={{
                  x: "-=280",
                  opacity: 0,
                  type: "from",
                  ease: "easeInExpo",
                  duration: 800,
                  delay: 1000
                }}
                className="font36 c333 absolute lh100 z-index10"
                style={{ left: "225px", top: "485px" }}
              >
                智能匹配，一键借到
              </TweenOne>
              <TweenOne
                key={uuid()}
                animation={{
                  y: "=190",
                  opacity: 0,
                  type: "from",
                  ease: "easeInExpo",
                  duration: 1000,
                  delay: 1000
                }}
                className="app-mark-two absolute"
                style={{
                  width: "170px",
                  height: "154px",
                  bottom: "190px",
                  right: "70px"
                }}
              />
            </div>
          </div>
        </OverPack>
        {/* 百款网贷产品 */}
        <OverPack
          replay
          playScale={[0.5, 0.8]}
          key={uuid()}
          className="bg-white app-common-bs"
          style={{ height: "820px", overflow: "hidden" }}
        >
          <div
            key={uuid()}
            className="box flex"
            style={{ paddingRight: "62px" }}
          >
            <div className="equal relative" style={{ height: "820px" }}>
              <TweenOne
                key={uuid()}
                animation={{
                  y: "=300",
                  opacity: 0,
                  type: "from",
                  ease: "easeInOutElastic",
                  duration: 500,
                  delay: 1000
                }}
                className="absolute app-mark-three"
                style={{
                  width: "170px",
                  height: "155px",
                  left: "50px",
                  top: "280px"
                }}
              />
              <TweenOne
                key={uuid()}
                animation={{
                  x: "-=500",
                  opacity: 0,
                  type: "from",
                  ease: "easeInQuad",
                  duration: 600
                }}
                className="absolute lh100"
                style={{
                  fontSize: "52px",
                  color: "#000",
                  left: "94px",
                  top: "372px"
                }}
              >
                百款网贷产品
              </TweenOne>
              <TweenOne
                key={uuid()}
                animation={{
                  x: "-=500",
                  opacity: 0,
                  type: "from",
                  ease: "easeInQuad",
                  duration: 600,
                  delay: 500
                }}
                className="font36 c333 absolute lh100 z-index10"
                style={{ left: "94px", top: "476px" }}
              >
                一分钟申请，两分钟下款
              </TweenOne>
              <TweenOne
                key={uuid()}
                animation={{
                  y: "-=300",
                  opacity: 0,
                  type: "from",
                  ease: "easeInOutElastic",
                  duration: 500,
                  delay: 1200
                }}
                className="app-mark-four absolute"
                style={{
                  width: "172px",
                  height: "154px",
                  bottom: "210px",
                  right: "130px"
                }}
              />
            </div>
            <TweenOne
              key={uuid()}
              animation={{
                x: "=300",
                opacity: 0,
                type: "from",
                ease: "easeInOutQuint",
                duration: 800
              }}
              className="app-phone-four"
              style={{ width: "380px", height: "810px", marginTop: "140px" }}
            />
          </div>
        </OverPack>
        {/* 信用卡中心 */}
        <OverPack
          replay
          playScale={[0.5, 0.8]}
          key={uuid()}
          className="app-common-bs"
          style={{
            height: "820px",
            backgroundColor: "#edf8ff",
            overflow: "hidden"
          }}
        >
          <div
            key={uuid()}
            className="box flex"
            style={{ paddingLeft: "60px" }}
          >
            <TweenOne
              key={uuid()}
              animation={{
                height: 0,
                opacity: 0,
                type: "from",
                ease: "easeInCirc",
                duration: 800
              }}
              className="app-phone-five"
              style={{ height: "808px", width: "380px", marginTop: "120px" }}
            />
            <div className="equal relative" style={{ height: "820px" }}>
              <div
                className="absolute app-mark-one"
                style={{
                  width: "173px",
                  height: "156px",
                  left: "90px",
                  top: "298px"
                }}
              />
              <TweenOne
                key={uuid()}
                animation={{
                  x: "=280",
                  opacity: 0,
                  type: "from",
                  ease: "easeInOutElastic",
                  duration: 800,
                  delay: 200
                }}
                className="absolute lh100"
                style={{
                  fontSize: "52px",
                  color: "#000",
                  left: "243px",
                  top: "392px"
                }}
              >
                信用卡中心
              </TweenOne>
              <TweenOne
                key={uuid()}
                animation={{
                  x: "=280",
                  opacity: 0,
                  type: "from",
                  ease: "easeInOutElastic",
                  duration: 800,
                  delay: 500
                }}
                className="font36 c333 absolute lh100 z-index10"
                style={{ left: "225px", top: "485px" }}
              >
                品种繁多，极速下卡
              </TweenOne>
              <div
                className="app-mark-two absolute"
                style={{
                  width: "170px",
                  height: "154px",
                  bottom: "190px",
                  right: "80px"
                }}
              />
            </div>
          </div>
        </OverPack>
        {/* 下载App */}
        <OverPack
          replay
          playScale={[0.5, 0.8]}
          key={uuid()}
          className="app-banner-bg app-common-bs"
          style={{ height: "720px" }}
        >
          <div
            key={uuid()}
            className="box flex column ai-center"
            style={{ paddingTop: "140px" }}
          >
            <TweenOne
              key={uuid()}
              animation={{
                opacity: 0,
                y: "-=140",
                type: "from",
                ease: "easeInCirc",
                duration: 500,
                delay: 400
              }}
              className="flex w76 h76 app-logo-bs ai-center jc-center bg-white"
            >
              <div className="app-logo w48 h50" />
            </TweenOne>
            <TweenOne
              key={uuid()}
              animation={{
                y: "-=200",
                opacity: 0,
                type: "from",
                ease: "easeOutQuint",
                duration: 500,
                delay: 100
              }}
              className="font46 c-white lh100"
              style={{ marginTop: "45px" }}
            >
              下载嘟嘟e融App
            </TweenOne>
            <div key={uuid()} className="flex" style={{ marginTop: "110px" }}>
              <TweenOne
                key={uuid()}
                animation={{
                  x: "-=400",
                  opacity: 0,
                  type: "from",
                  ease: "easeInOutCubic",
                  duration: 800
                }}
                className="app-qrcode-bg mr30"
                style={{ width: "144px", height: "144px" }}
              />
              <TweenOne
                key={uuid()}
                animation={{
                  x: "=400",
                  opacity: 0,
                  type: "from",
                  ease: "easeInOutCubic",
                  duration: 800
                }}
                className="flex column jc-between"
              >
                <div
                  className="h58 flex ai-center r100 jc-center "
                  style={{ width: "248px", border: "1px solid #fff" }}
                >
                  <Icon
                    type="android"
                    style={{ fontSize: 32, color: "#fff" }}
                  />
                  <div className="c-white font24 pl15">安卓版下载</div>
                </div>
                <div
                  className="h58 flex ai-center jc-center r100"
                  style={{ width: "248px", border: "1px solid #fff" }}
                >
                  <Icon type="apple" style={{ fontSize: 32, color: "#fff" }} />
                  <div className="c-white font24 pl15">苹果版下载</div>
                </div>
              </TweenOne>
            </div>
          </div>
        </OverPack>
        {/* 下载页面底部 */}
        <div className="h100 pt30" style={{ backgroundColor: "#404040" }}>
          <div className="font14 lh100 flex c-white jc-center">
            <WrapLink
              href="/about"
              as="/about"
              className="c-white plr10 border-right"
            >
              关于我们
            </WrapLink>
            <WrapLink
              href="/about"
              as="/about"
              className="plr10 border-right c-white"
            >
              联系我们
            </WrapLink>
            <WrapLink
              href="/about"
              as="/about"
              className="plr10 border-right c-white"
            >
              信贷经理入驻
            </WrapLink>
            <WrapLink href="/about" as="/about" className="pl10 c-white">
              信贷经理登录
            </WrapLink>
          </div>
          <div className="font12 mt15 c-white w-100 text-center">
            Copyright&nbsp;2014&nbsp;&nbsp;河南晨隆金融服务有限公司&nbsp;&nbsp;版权所有&nbsp;&nbsp;豫ICP备14012584号-3
          </div>
        </div>
      </Layout>
    );
  }
}

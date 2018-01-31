import React, { Component } from "react";
import TweenOne from "rc-tween-one";
import QueueAnim from "rc-queue-anim";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import uuid from "uuid/v4";
import { Layout } from "@components";

export default class extends Component {
  state = {};
  render() {
    return (
      <Layout title="关于我们" style={{ backgroundColor: "#fff" }}>
        {/* banan */}
        <div
          style={{ height: "300px", backgroundColor: "#88bdff" }}
          className="about-banner-bg"
        />
        {/* 公司简介 */}
        <OverPack
          style={{ height: "655px" }}
          replay
          playScale={[0.5, 0.7]}
          key={uuid()}
        >
          <TweenOne
            key={uuid()}
            animation={{
              x: "-=30",
              opacity: 0,
              type: "from",
              ease: "easeOutQuad"
            }}
            style={{ height: "210px" }}
            className=" box font30 c333  bold flex jc-center ai-center about-title-bg"
          >
            公司简介
          </TweenOne>
          <div className="box flex jc-between relative" key={uuid()}>
            <TweenOne
              key={uuid()}
              animation={{
                x: "-=30",
                opacity: 0,
                type: "from",
                ease: "easeOutQuad"
              }}
              style={{
                width: "520px",
                height: "325px",
                border: "1px solid  #4c8dfc"
              }}
              className=" r2"
            >
              <div
                key={uuid()}
                style={{ bottom: "-30px", right: "-30px" }}
                className="relative about-intro"
              />
            </TweenOne>
            <QueueAnim
              type="right"
              key={uuid()}
              leaveReverse
              ease={["easeOutCubic", "easeInCubic"]}
              style={{ width: "576px", marginBottom: "100px" }}
            >
              <div
                key={uuid()}
                style={{ borderLeft: "6px solid #4c8dfc" }}
                className="font24 bold lh100 pl15 mb30"
              >
                嘟嘟e融
              </div>
              <div
                key={uuid()}
                style={{ lineHeight: "26px" }}
                className="font14 c333"
              >
                <p className="mb30" key={uuid()}>
                  嘟嘟 e 融隶属于河南晨隆金融服务有限公司旗下独立品牌，成立于
                  2017 年 11
                  月，经郑州市工商局注册成立的合法互联网金融服务公司，是由从业于互联网、金融行业多年的精英团队倾力打造，是在原中国投融资行业的发展基础上建立的一个安全规范、简便快捷、公平透明、互惠互赢的第三方网络金融信息服务平台，它创新了未来金融发展新模式，引领着民间借贷未来发展新方向，是一种完全脱离传统业务模式，具有全新金融服务理念的行业。旗下拥有全国上千城市连锁服务平台，充分利用网络资源，通过线上与线下的完美结合，为需要融资的中小企业和个人提供全面系统的融资服务平台。
                </p>
                <p key={uuid()}>
                  嘟嘟 e
                  融致力服务于中国中小微城市信用贷款市场，让贷款客户与贷款机构直接对接一站式完成，同时平台内仅收录中国各正规银行、小额贷款公司、P2P平台等小额贷款产品，杜绝不好的、骗子贷款产品，让贷款从这里安全、简单、便捷。
                </p>
              </div>
            </QueueAnim>
          </div>
        </OverPack>
        {/* 业务模式 */}
        <div key={uuid()} className="about_business_bg">
          <OverPack key={uuid()} className=" box">
            <TweenOne
              key={uuid()}
              animation={{
                y: "-=30",
                opacity: 0,
                type: "from",
                ease: "easeOutQuad"
              }}
              style={{ height: "174px", color: "#f9f8f8" }}
              className="flex jc-center ai-center font30 bold about-title-businessbg"
            >
              业务模式
            </TweenOne>
            <div key={uuid()} className="flex jc-between">
              <TweenOne
                key={uuid()}
                animation={{
                  x: "-=30",
                  opacity: 0,
                  type: "from",
                  ease: "easeOutQuad"
                }}
                style={{ width: "500px", height: "500px" }}
              >
                <div key={uuid()} className="about-business-one" />
                <div
                  key={uuid()}
                  style={{ height: "250px" }}
                  className=" plr30 ptb30 bg-main"
                >
                  <div key={uuid()} className="about_business-title mb25">
                    业务模式
                  </div>
                  <p
                    key={uuid()}
                    style={{ lineHeight: "26px" }}
                    className=" font14 c-white"
                  >
                    平台汇集中国地区内各银行及小额信用贷款机构、P2P平台等，选择各平台优质贷款产品并展示于嘟嘟e融网站中，用户进入网站后可以更方便的找到各公司的贷款产品并在线申请，解决用户和贷款机构之间的信息不对称性问题，嘟嘟e融提供一站式快捷，直观，灵活的贷款产品服务于客户。
                  </p>
                </div>
              </TweenOne>
              <div style={{ width: "630px" }}>
                <TweenOne
                  key={uuid()}
                  animation={{
                    y: "-=30",
                    opacity: 0,
                    type: "from",
                    ease: "easeOutQuad"
                  }}
                  className="about-business-two"
                >
                  <div
                    key={uuid()}
                    style={{ marginBottom: "70px" }}
                    className="about_business-title"
                  >
                    嘟嘟e融宗旨
                  </div>
                  <div
                    key={uuid()}
                    style={{ letterSpacing: "2px" }}
                    className="text-center font32 c-white lh100"
                  >
                    只做正规机构的贷款产品
                  </div>
                </TweenOne>
                <TweenOne
                  key={uuid()}
                  animation={{
                    y: "+=30",
                    opacity: 0,
                    type: "from",
                    ease: "easeOutQuad"
                  }}
                  className="about-business-three"
                >
                  <div
                    key={uuid()}
                    style={{ marginBottom: "67px" }}
                    className="about_business-title"
                  >
                    嘟嘟e融目标
                  </div>
                  <div
                    key={uuid()}
                    style={{ letterSpacing: "1px" }}
                    className="text-center font32 c-white lh100"
                  >
                    让中小微城市信用贷款从这里开始简单
                  </div>
                </TweenOne>
              </div>
            </div>
          </OverPack>
        </div>
        {/* 企业文化 */}
        <div key={uuid()} style={{ height: "600px" }} className="flex">
          <OverPack
            key={uuid()}
            style={{
              width: "1060px",
              background: "#202020",
              paddingTop: "50px"
            }}
          >
            <TweenOne
              key={uuid()}
              animation={{
                x: "-30",
                opacity: 0,
                type: "from",
                ease: "easeOutQuad"
              }}
              style={{ width: "900px", height: "92px" }}
              className=" text-right about-culture-title mb30"
            >
              企业文化
            </TweenOne>
            <QueueAnim
              type="left"
              ease={["easeOutCubic", "easeInCubic"]}
              key={uuid()}
              style={{ height: "378px", right: "-37px" }}
              className="relative"
            >
              <div key={uuid()} className="about-culture-list  vision">
                <div>企业愿景</div>
                <p>打造中国最安全、最快捷、最方便的金融信息服务平台</p>
              </div>
              <div key={uuid()} className="about-culture-list mission">
                <div>公司使命</div>
                <p>对员工负责 、对客户负责、对社会负责</p>
              </div>
              <div key={uuid()} className="about-culture-list idea">
                <div>经营理念</div>
                <p>让中小微城市的贷款从这里开始简单</p>
              </div>
              <div key={uuid()} className="about-culture-list value">
                <div>核心价值观</div>
                <p>以团队精神追求目标，为客户创造最大价值</p>
              </div>
            </QueueAnim>
          </OverPack>
          <div
            key={uuid()}
            style={{ width: "860px" }}
            className="about-culture-bg"
          />
        </div>
        {/* 联系我们 */}
        <div style={{ height: "844px" }}>
          <OverPack key={uuid()} className="box">
            <TweenOne
              key={uuid()}
              animation={{
                y: "-=30",
                opacity: 0,
                type: "from",
                ease: "easeOutQuad"
              }}
              style={{ height: "206px", lineHeight: "206px" }}
              className="about-contact-title"
            >
              联系我们
            </TweenOne>
            <QueueAnim key={uuid()} type="left" className="flex jc-between">
              <div
                key={uuid()}
                style={{
                  width: "520px",
                  height: "527px",
                  paddingTop: "80px",
                  paddingBottom: "80px",
                  boxShadow: "0px 5px 20px 0px rgba(76, 141, 252, 0.25)"
                }}
                className="r2 bg-white flex column ai-center jc-between"
              >
                <div key={uuid()} className="about-contact-list">
                  <div key={uuid()}>客服热线</div>
                  <p key={uuid()}>400-869-8881</p>
                </div>
                <div key={uuid()} className="about-contact-list">
                  <div key={uuid()}>在线咨询</div>
                  <a
                    key={uuid()}
                    style={{ target: "_blank" }}
                    href="http://wpa.qq.com/msgrd?v=3&uin=506340225&site=qq&menu=yes"
                  >
                    QQ:506340225
                  </a>
                </div>
                <div key={uuid()} className="about-contact-list">
                  <div key={uuid()}>公司地址</div>
                  <p key={uuid()}>
                    浙江省杭州市滨江区滨安路650号IX-WORKB座701室
                  </p>
                </div>
              </div>
              <div
                key={uuid()}
                className="about-contact-bg flex jc-center ai-end r2"
              >
                <p key={uuid()}>
                  市场合作：如果有商务合作、市场合作、品牌合作、渠道合作、流量合作等需求，请联系
                  <a
                    key={uuid()}
                    style={{ target: "_blank" }}
                    href="http://wpa.qq.com/msgrd?v=3&uin=506340225&site=qq&menu=yes"
                  >
                    QQ:506340225
                  </a>
                  点击号码即可申请加入
                  我们会在两个自然工作日内尽快与您联系。为提高合作效率，不接受电话来访，客服热线无法转接。感谢您的配合!
                </p>
              </div>
            </QueueAnim>
          </OverPack>
        </div>
      </Layout>
    );
  }
}

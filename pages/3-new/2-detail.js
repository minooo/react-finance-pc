import React, { Component } from "react";
import uuid from "uuid/v4";
import { Layout, WrapLink, ErrorFetch } from "@components";
import { http } from "@utils";

const util = require("util");

export default class extends Component {
  static async getInitialProps(ctx) {
    // err req res pathname query asPath isServer
    const { query: { id }, req } = ctx;
    try {
      const nweDetailFetch = await http.get(
        `/information/detail/${id}`,
        null,
        !!req
      );
      const { success, code, msg } = nweDetailFetch;
      const { detail, hot, type, previous, next } = nweDetailFetch.data;
      return { success, code, msg, detail, hot, type, previous, next };
    } catch (error) {
      const err = util.inspect(error);
      return { err };
    }
  }
  componentDidMount() {
    /* eslint-disable */
    const { detail } = this.props;
    window._bd_share_config = {
      common: {
        bdStyle: "1",
        bdText: detail && detail.title,
        bdDesc: detail && detail.content.substr(0, 20)
      },
      share: [
        {
          bdSize: 24
        }
      ]
    };
    if (!window._bd_share_main) {
      require("../../static/scripts/share.js");
    } else {
      window._bd_share_main.init();
    }
    /* eslint-enable */
  }
  componentWillReceiveProps() {
    const dia = document.getElementById("bdshare_weixin_qrcode_dialog");
    if (dia) {
      dia.style.display = "none";
    }
    // eslint-disable-next-line
    window._bd_share_main && window._bd_share_main.init();
  }
  componentWillUpdate() {
    /* eslint-disable */
    window._bd_share_config = {
      common: {
        bdSnsKey: {},
        bdText: "",
        bdMini: "2",
        bdMiniList: false,
        bdPic: "",
        bdStyle: "1",
        bdSize: "32"
      },
      share: {}
    };
    require("../../static/scripts/share.js");
  }
  componentWillUnmount() {
    const dia = document.getElementById("bdshare_weixin_qrcode_dialog");
    if (dia) {
      dia.style.display = "none";
    }
    // eslint-disable-next-line
    window._bd_share_main && window._bd_share_main.init();
  }
  render() {
    const {
      err,
      success,
      code,
      msg,
      detail,
      hot,
      type,
      previous,
      next
    } = this.props;
    if (err) return <ErrorFetch err={err} />;
    if (!success || code !== 200)
      return <ErrorFetch err={msg || "抱歉，请求异常，请稍后再试！"} />;
    if (!detail) return null;
    return (
      <Layout title="资讯详情" style={{ backgroundColor: "#f8f8f8" }}>
        {/* banner */}
        <div style={{ height: "300px", backgroundColor: "#6bb0ff" }}>
          <div
            style={{ backgroundColor: "#6bb0ff" }}
            className="box h-100 loan-banner-bg"
          />
        </div>
        {/* 主体 */}
        <div className="box">
          {/* 面包屑 */}
          <div className="h70 flex ai-center crumbs-ico-bg">
            <WrapLink href="/" as="/" className="c333 font16">
              首页
            </WrapLink>
            <div className="crumbs-ico-right-bg ml10 mr10" />
            <WrapLink href="/3-new/1-home" as="/new" className="c333 font16">
              资讯
            </WrapLink>
            <div className="crumbs-ico-right-bg ml10 mr10" />
            <span className="c333 font16">
              {type &&
                type.length > 0 &&
                type.map(item => {
                  if (detail.type === item.id) {
                    return item.name;
                  }
                  return null;
                })}
            </span>
          </div>
          {/* 核心块 */}
          <div className="flex">
            {/* 左边  */}
            <div
              style={{ paddingTop: "60px", paddingBottom: "135px" }}
              className="equal bg-white plr30"
            >
              <div className=" text-center c333 bold font20 mb20">
                {detail.title}
              </div>
              <div className=" c999 text-center font14 mb25">
                【{detail.created_at.substr(0, 10)}】
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: detail.content
                }}
              />
              <div
                className="bdsharebuttonbox flex jc-end mt30 mb25"
                data-tag="share_1"
              >
                <a
                  href="www.baidu.com"
                  className="bds_weixin"
                  data-cmd="weixin"
                  title="分享到微信"
                >
                  {null}
                </a>
                <a
                  href="www.baidu.com"
                  className="bds_tsina"
                  data-cmd="tsina"
                  title="分享到新浪微博"
                >
                  {null}
                </a>
                <a
                  href="www.baidu.com"
                  className="bds_qzone"
                  data-cmd="qzone"
                  title="分享到QQ空间"
                >
                  {null}
                </a>
              </div>
              <div>
                {previous &&
                  previous.id && (
                    <WrapLink
                      href={`/3-new/2-detail?id=${previous.id}`}
                      as={`/new/${previous.id}`}
                      style={{ color: "#26709a" }}
                      className=" font14 lh100 mb15"
                    >
                      【上一篇】
                      {previous.title}
                    </WrapLink>
                  )}
                <div className="pt10" />
                {next &&
                  next.id && (
                    <WrapLink
                      href={`/3-new/2-detail?id=${next.id}`}
                      as={`/new/${next.id}`}
                      style={{ color: "#26709a" }}
                      className=" font14 lh100 mb15"
                    >
                      【下一篇】
                      {next.title}
                    </WrapLink>
                  )}
              </div>
            </div>
            {/* 右边 资讯排行 */}
            <div style={{ width: "290px" }} className="ml20">
              {/* 分类选项 */}
              <div className=" bg-white mb20  plr25 pb10">
                <div className=" font20 ptb25 bold c333 lh100">
                  资讯热门分类
                </div>
                <div className="flex wrap jc-between">
                  {type &&
                    type.length > 0 &&
                    type.map(item => (
                      <WrapLink
                        key={uuid()}
                        href="/3-new/1-home"
                        as={`/new?typenew=${item.id}`}
                        className={`w110 h34  r2 mb20 flex jc-center ai-center ${
                          detail.type === item.id ? "new-active" : "new-default"
                        }`}
                      >
                        <span
                          className={`${
                            detail.type === item.id ? "c-white" : "c-main"
                          } text-center font14  lh100`}
                        >
                          {item.name}
                        </span>
                      </WrapLink>
                    ))}
                </div>
              </div>
              <div className="bg-white plr25 pb15">
                <div className="font20 bold pt25 pb15">热门资讯</div>
                {hot &&
                  hot.length > 0 &&
                  hot.slice(0, 9).map((item, index) => (
                    <WrapLink
                      key={uuid()}
                      href={`/3-new/2-detail?id=${item.id}`}
                      as={`/new/${item.id}`}
                      className="font14 c333 mb10 text-overflow-one block"
                      title={item.title}
                    >
                      <span className={index < 3 ? "c-main" : "c666"}>
                        【{index + 1}】
                      </span>
                      {item.title}
                    </WrapLink>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "53px" }} />
      </Layout>
    );
  }
}

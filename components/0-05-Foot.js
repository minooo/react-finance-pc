import { WrapLink } from "@components";
import uuid from "uuid/v4";

const config = [
  {
    text: "首页",
    href: "/index",
    as: "/"
  },
  {
    text: "极速贷",
    href: "/",
    as: "/"
  },
  {
    text: "同城贷",
    href: "/",
    as: "/"
  },
  {
    text: "信用卡",
    href: "/",
    as: "/"
  },
  {
    text: "关于我们",
    href: "/",
    as: "/"
  },
  {
    text: "联系我们",
    href: "/",
    as: "/"
  },
  {
    text: "贷款资讯",
    href: "/",
    as: "/"
  },
  {
    text: "贷款攻略",
    href: "/",
    as: "/"
  }
];
export default () => (
  <div
    style={{
      height: "236px",
      backgroundColor: "#404040",
      paddingTop: "40px"
    }}
    className="w-100"
  >
    <div className="box">
      <div className="flex jc-between">
        <div
          style={{ width: "210px" }}
          className="flex column wrap  ac-between h120 mt10"
        >
          {config.map(item => (
            <WrapLink
              className="font14 c-white lh100 mb15"
              href={item.href}
              as={item.as}
              key={uuid()}
              style={{ maxWidth: "100%" }}
            >
              {item.text}
            </WrapLink>
          ))}
        </div>
        <div style={{ width: "815px" }} className="flex jc-between">
          <div className="flex ai-center">
            <img src="/static/images/foot-app.png" alt="" />
            <div className="font14 ml20 c-white">
              <div className="mb10">嘟嘟e融APP</div>
              <WrapLink>
                立即下载&nbsp;&gt;
              </WrapLink>
            </div>
          </div>
          <div className="flex ai-center">
            <img src="/static/images/foot-code.png" alt="" />
            <div className="font14 ml20 c-white">
              <div className="mb10">嘟嘟e融公众号</div>
              <div>扫码进入&nbsp;&gt;</div>
            </div>
          </div>
          <div className="flex ai-center">
            <img src="/static/images/foot-code.png" alt="" />
            <div className="font14 ml20 c-white">
              <div className="mb10">嘟嘟e融手机版</div>
              <div>扫码进入&nbsp;&gt;</div>
            </div>
          </div>
        </div>
      </div>
      <div className="font12 mt30 c-white w-100 text-center">
        Copyright&nbsp;2018&nbsp;&nbsp;河南晨隆金融服务有限公司&nbsp;&nbsp;版权所有&nbsp;&nbsp;豫ICP备13439999号-2
      </div>
    </div>
  </div >
);

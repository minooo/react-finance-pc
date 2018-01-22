import { ActiveLink, WrapLink } from "@components";
import uuid from "uuid/v4";

const config = [
  {
    text: "首页",
    href: "/index",
    as: "/"
  },
  {
    text: "贷款超市",
    href: "/1-loan/1-home",
    as: "/loan"
  },
  {
    text: "办信用卡",
    href: "/2-card/1-home",
    as: "/card"
  },
  {
    text: "资讯",
    href: "/3-new/1-home",
    as: "/new"
  },
  {
    text: "APP下载",
    href: "/downloadApp",
    as: "/downloadApp"
  }
];

export default () => (
  <div
    style={{ position: "relative", zIndex: 5 }}
    className="flex jc-between h64"
  >
    <div className="flex">
      <WrapLink style={{ width: "140px", height: "60px" }} className="ml30 mr30">
        <img
          src="http://dummyimage.com/140x60"
          alt=""
          className="w-100 h-100"
        />
      </WrapLink>
      {config.map(item => <ActiveLink key={uuid()} {...item} />)}
    </div>
    <ActiveLink text="登陆" href="/4-me/1-login" as="/login" />
  </div>
);

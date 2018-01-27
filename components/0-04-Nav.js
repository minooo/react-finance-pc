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
    text: "关于我们",
    href: "/about",
    as: "/about"
  },
  {
    text: "APP下载",
    href: "/downloadApp",
    as: "/downloadApp"
  }
];

export default () => (
  <div className="bg-white">
    <div
      style={{ position: "relative", zIndex: 5 }}
      className="flex jc-between ai-center h80 box"
    >
      <WrapLink style={{ width: "140px", height: "60px" }}>
        <img
          src="http://dummyimage.com/140x60"
          alt=""
          className="w-100 h-100"
        />
      </WrapLink>
      <div className="flex">
        {config.map(item => <ActiveLink key={uuid()} {...item} />)}
      </div>
    </div>
  </div>
);

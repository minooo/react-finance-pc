import { Button } from "antd";
import { WrapLink } from "@components";

export default ({ item, index }) => (
  <WrapLink
    style={{ width: "170px" }}
    className={`flex column ai-center ${
      (index + 1) % 4 === 0 ? "" : "mr20"
    } ${index < 4 ? "mb30" : ""}`}
    href="/index"
    as="/"
  >
    <div className="img-bg h106 w-100">
      <img src={item.img} className="w-100 h-100" alt="" />
    </div>
    <div className="h54 flex column ai-center jc-center">
      <div className="font14 bold text-overflow-one c333">
        {item.title}
      </div>
      <div className="font12 text-overflow-one c666">
        {item.caption}
      </div>
    </div>
    <Button type="primary" className="w120 h30 r2 font14 mb5">
      免费申请
    </Button>
    <div className="font12 c333">
      <span className="c-main">{item.applyNum}人</span>申请
    </div>
  </WrapLink>
);

import { Button } from "antd";
import { WrapLink } from "@components";

export default ({ item }) => (
  <WrapLink
    href={item.external_links}
    style={{ height: "126px" }}
    className="flex ai-center plr20 border-bottom transition loan-list-hover bg-white"
  >
    <div className="w106 h66 img-bg mr15">
      <img src={item.thumb} alt="" className="w-100 h-100" />
    </div>
    <div className="flex column h56 jc-between equal overflow-h pr20">
      <div className="font18 c333 lh100 text-overflow-one">{item.name}</div>
      <div className="font12 c999 lh100 text-overflow-one">{item.description}</div>
    </div>
    <div
      style={{ borderLeft: "1px solid #f2f2f2" }}
      className="h62 flex column jc-between plr30"
    >
      <div className="font14 c333 lh100">
        <span className="font12 c999">卡片等级：</span>
        {item.level}
      </div>
      <div className="font14 c333 lh100">
        <span className="font12 c999">系列币种：</span>
        {item.currency}
      </div>
      <div className="font14 c333 lh100">
        <span className="font12 c999">年费政策：</span>
        {(item.yearFee && item.yearFee.substr(0, 10)) || "暂无"}
      </div>
    </div>
    <div className="h56 flex column jc-center ai-center pl30">
      {/* <div className="font14 c333 lh100 text-overflow-one mb5">
        <span className="c-main">{item.apply_num || 0}人申请</span>
      </div> */}
      <Button type="primary" className="h32 w110 r100 font14 bold">
        立即申请
      </Button>
    </div>
  </WrapLink>
);

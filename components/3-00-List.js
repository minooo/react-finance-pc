import { Button } from "antd";
import { WrapLink } from "@components";

export default ({ item }) => (
  <WrapLink
    href={item.link}
    style={{ height: "126px" }}
    className="flex ai-center plr20 border-bottom transition loan-list-hover bg-white"
  >
    <div className="w106 h66 img-bg mr15">
      <img src={item.img} alt="" className="w-100 h-100" />
    </div>
    <div className="flex column h56 jc-between equal overflow-h pr20">
      <div className="font18 c333 lh100 text-overflow-one">{item.title}</div>
      <div className="font12 c999 lh100 text-overflow-one">{item.caption}</div>
    </div>
    <div
      style={{ borderLeft: "1px solid #f2f2f2" }}
      className="h62 flex column jc-between plr30"
    >
      <div className="font14 c333 lh100">
        <span className="font12 c999">贷款期限：</span>
        {item.grade}
      </div>
      <div className="font14 c333 lh100">
        <span className="font12 c999">系列币种：</span>
        {item.cardType}
      </div>
      <div className="font14 c333 lh100">
        <span className="font12 c999">年费政策：</span>
        {item.payMethod && item.payMethod.substr(0, 10)}
      </div>
    </div>
    <div className="h56 flex column jc-between ai-center pl30">
      <div className="font14 c333 lh100 text-overflow-one">
        <span className="c-main">{item.applyNum}人申请</span>
      </div>
      <Button type="primary" className="h32 w110 r100 font14 bold">
        立即申请
      </Button>
    </div>
  </WrapLink>
);

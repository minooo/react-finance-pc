import { Button } from "antd";
import { WrapLink } from "@components";
import { clipBigNum } from "@utils";

export default ({ item }) => (
  <WrapLink
    href="/"
    as="/"
    style={{ height: "126px" }}
    className="flex ai-center plr20 border-bottom transition loan-list-hover bg-white"
  >
    <div className="h66 w66 img-bg mr20">
      <img src={item.img} alt="" className="w-100 h-100" />
    </div>
    <div className="h56 flex column jc-between equal overflow-h">
      <div className="font18 c333 lh100 text-overflow-one">{item.title}</div>
      <div className="font12 c999 lh100 text-overflow-one">{item.caption}</div>
    </div>
    <div className="h56 flex column jc-between ai-center plr20">
      <div className="font14 c333 lh100 text-overflow-one">
        {clipBigNum(item.minMoney)}-{clipBigNum(item.maxMoney)}
      </div>
      <div className="font12 c999 lh100 text-overflow-one">{item.caption}</div>
    </div>
    <div className="h56 flex column jc-between ai-center plr20">
      <div className="font14 c333 lh100 text-overflow-one">{item.rate}%</div>
      <div className="font12 c999 lh100 text-overflow-one">
        {item.rateMethod}利率
      </div>
    </div>
    <div className="h56 flex column jc-between ai-center plr20">
      <div className="font14 c333 lh100 text-overflow-one">
        {item.timelimit}
      </div>
      <div className="font12 c999 lh100 text-overflow-one">贷款期限</div>
    </div>
    <div className="h56 flex column jc-between ai-center plr20">
      <div className="font14 c333 lh100 text-overflow-one">
        {item.payMethod && item.payMethod.substr(0, 8)}
      </div>
      <div className="font12 c999 lh100 text-overflow-one">放款时间</div>
    </div>
    <div className="h56 flex column jc-between ai-center pl20">
      <div className="font14 c333 lh100 text-overflow-one">
        <span className="c-main">{item.applyNum}人申请</span>
      </div>
      <Button type="primary" className="h32 w110 r100 font14 bold">
        立即申请
      </Button>
    </div>
  </WrapLink>
);

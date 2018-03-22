import { Button } from "antd";
import { WrapLink } from "@components";
import { clipBigNum } from "@utils";

export default ({ item }) => (
  <WrapLink
    href={
      item.category === 2
        ? `/1-loan/3-detail/${item.id}`
        : `/1-loan/6-speed-detail/${item.id}`
    }
    as={
      item.category === 2
        ? `/loan/${item.id}`
        : `/loan/speed/${item.id}`
    }
    style={{ height: "126px" }}
    className="flex ai-center plr20 border-bottom transition loan-list-hover bg-white"
  >
    <div className="h66 w66 img-bg mr20">
      <img src={item.thumb} alt="" className="w-100 h-100" />
    </div>
    <div className="h56 flex column jc-between equal overflow-h">
      <div className="font18 c333 lh100 text-overflow-one">{item.name}</div>
      <div className="font12 c999 lh100 text-overflow-one">
        {item.description}
      </div>
    </div>
    <div className="h56 flex column jc-between ai-center plr20">
      <div className="font14 c333 lh100 text-overflow-one">
        {clipBigNum(item.sum_start)}-{clipBigNum(item.sum_end)}
      </div>
      <div className="font12 c999 lh100 text-overflow-one">贷款额度</div>
    </div>
    <div className="h56 flex column jc-between ai-center plr20">
      <div className="font14 c333 lh100 text-overflow-one">
        {item.interest_rate}%
      </div>
      <div className="font12 c999 lh100 text-overflow-one">
        {item.interest_rate_method}利率
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
        {item.cycle && item.cycle.substr(0, 8)}
      </div>
      <div className="font12 c999 lh100 text-overflow-one">放款时间</div>
    </div>
    <div className="h56 flex column jc-center ai-center pl20">
      {/* <div className="font14 c333 lh100 text-overflow-one mb5">
        <span className="c-main">{item.apply_num}人申请</span>
      </div> */}
      <Button type="primary" className="h32 w110 r100 font14 bold">
        立即申请
      </Button>
    </div>
  </WrapLink>
);

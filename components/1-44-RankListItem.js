import { Icon } from "antd";
import { WrapLink } from "@components";

export default ({ item, isrank }) => (
  <WrapLink
    href={`/1-loan/3-detail?id=${item.id}`}
    as={`/loan/${item.id}`}
    className="block"
  >
    <div
      className={`flex mb10 pl10 pt20 pb15 ${
        isrank ? "pr20" : "pr15"
      } h100 home-loanlist-hover pointer`}
    >
      <div className="w66 h66 img-bg">
        <img className="w-100 h-100" src={item.thumb} alt="" />
      </div>
      <div className="flex equal jc-between pl15">
        <div className="flex column jc-between c333 font12">
          <div className="flex font16 lh120 text-overflow-1 bold">
            {item.name}
          </div>
          <div className="lh120 text-overflow-1">
            <span className={`${isrank ? "c-main" : "c333"}`}>
              {item.apply_num}
            </span>人申请
          </div>
          <div
            className={`font12 lh120 text-overflow-1 ${
              isrank ? "c333" : "c-second"
            }`}
          >
            {item.description}
          </div>
        </div>
        <div className="flex ai-center c999">
          <Icon type="right" style={{ fontSize: 14 }} />
        </div>
      </div>
    </div>
  </WrapLink>
);

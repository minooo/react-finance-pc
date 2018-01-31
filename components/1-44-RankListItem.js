import { Icon } from "antd";
import { WrapLink } from "@components";

export default ({ item, isrank, isRight }) => (
  <WrapLink href="/index" as="/" className="block">
    <div
      className={`flex mb10 pl10 pt20 pb15 ${isrank ? "pr20" : "pr15"} h100 home-loanlist-hover pointer`}
    >
      <div className="w66 h66 img-bg">
        <img className="w-100 h-100" src={item.img} alt="" />
      </div>
      <div className="flex equal jc-between pl15">
        <div className="flex column jc-between c333 font12">
          <div className="flex font16 lh120 text-overflow-1 bold">
            {item.title}
          </div>
          <div className="lh120 text-overflow-1">
            <span className={`${isrank ? "c-main" : "c333"}`}>{item.number}</span>申请
          </div>
          <div className={`font12 lh120 text-overflow-1 ${isrank ? "c333" : "c-second"}`}>
            {item.content}
          </div>
        </div>
        {
          isRight ?
          <div className="flex ai-center c999">
            <Icon type="right" style={{ fontSize: 14 }} />
          </div> : null
        }

      </div>
    </div>
  </WrapLink>
)

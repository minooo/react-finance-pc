import { Icon } from "antd";
import { WrapLink } from "@components";
import { clipBigNum } from "@utils";

export default ({ item, isrank, isRight }) => (
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
      <div className="flex equal jc-between pl15 overflow-h">
        <div className="flex column jc-between c333 font12 overflow-h">
          <div className="flex font16 lh120 text-overflow-one bold inline-block">
            {item.name}
          </div>
          {isrank || (
            <div className="lh120 text-overflow-one">{item.description}</div>
          )}
          {isrank ? (
            <div className="font12 lh120 text-overflow-one c333 inline-block">
              {item.description}
            </div>
          ) : (
            <div className="font12 lh120 text-overflow-one c-second inline-block">
              {clipBigNum(item.sum_start)}~{clipBigNum(item.sum_end)}
            </div>
          )}
        </div>
        {isRight && (
          <div className="flex ai-center c999">
            <Icon type="right" style={{ fontSize: 14 }} />
          </div>
        )}
      </div>
    </div>
  </WrapLink>
);

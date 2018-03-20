import { WrapLink } from "@components";

export default ({ item, index }) => (
  <WrapLink href={item.pc_outside_link} as="/">
    {index < 3 ? (
      <div className="flex ptb15 plr10 c333 home-loanlist-hover">
        <div className="w106 h66">
          <img src={item.images} alt="" className="w-100 h-100" />
        </div>
        <div className="flex column equal overflow-h jc-between pl15 ptb5">
          <div className="font16 lh120 text-overflow-one">{item.name}</div>
          <div className="font12 lh120 c333 text-overflow-one">
            {/* <span className="c-main">{item.apply_num}</span>人申请 */}
          </div>
        </div>
      </div>
    ) : (
      <div className="flex jc-between ai-center mt20 mb5">
        <div className="flex ai-center">
          <div
            className="c-white bg-999 circle font12 text-center mr10"
            style={{ lineHeight: "16px", width: "16px", height: "16px" }}
          >
            {index + 1}
          </div>
          <div
            className="c333 font16 lh120 text-overflow-one"
            style={{ width: "180px" }}
          >
            {item.name}
          </div>
        </div>
        <div className="font12 lh100 c333">
          {/* <span className="c-main">{item.apply_num}</span>人申请 */}
        </div>
      </div>
    )}
  </WrapLink>
);

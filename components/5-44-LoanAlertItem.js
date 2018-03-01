import React, { Fragment } from "react";

export default ({ title, content }) => (
  <Fragment>
    <div
      className="me-loanapply-bordersize c666 flex h56 ai-center jc-center border-right border-bottom-one"
      style={{ width: "160px", backgroundColor: "#fafafa" }}
    >
      {title}
    </div>
    <div
      className="me-loanapply-bordersize c333 h56 flex ai-center jc-center border-right border-bottom-one"
      style={{ width: "219px" }}
    >
      <span className="text-overflow-one plr10">{content || "暂无"}</span>
    </div>
  </Fragment>

)

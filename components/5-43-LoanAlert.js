import React, { Fragment } from "react";
import { Icon } from "antd";
import { Btn, AlertBg, MeLoanAlertItem } from "@components";

export default ({ detailed, closeModal }) => (
  <Fragment>
    <AlertBg />
    <div
      className="bg-white absolute z-index100"
      style={{ left: "0px", bottom: "70px", width: "820px", height: "308px" }}
    >
      {/* 头部 */}
      <div
        className="h62 flex ai-center jc-between"
        style={{ backgroundColor: "#edf2f8" }}
      >
        <div className="font16 c333 pl30 bold">申请详情</div>
        <Btn
          con={<Icon type="close" />}
          onClick={closeModal}
          className="c999 font18 mr30"
        />
      </div>
      <div
        className="plr30 bg-white font14"
        style={{ height: "246px", paddingTop: "40px" }}
      >
        <div className="me-loanapply-border-tlr flex wrap">
          <MeLoanAlertItem
            title="贷款产品"
            content={detailed && detailed.product_name}
          />
          <MeLoanAlertItem
            title="发布时间"
            content={detailed && detailed.created_at}
          />
          <MeLoanAlertItem
            title="贷款额度"
            content={detailed && detailed.money}
          />
          <MeLoanAlertItem
            title="贷款类型"
            content={detailed && detailed.genre}
          />
          <MeLoanAlertItem
            title="贷款期限"
            content={detailed && detailed.deadline}
          />
          <MeLoanAlertItem
            title="需款时间"
            content={detailed && detailed.cycle}
          />
        </div>
      </div>
    </div>
  </Fragment>
);

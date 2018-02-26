import { Fragment } from "react";
import { WrapLink } from "@components";

export default () => (
  <Fragment>
    <div className="h50" />
    <div className="flex column ai-center jc-between h160">
      <div className="font16 bold c666">
        请您保持电话通畅，信贷经理将尽快与您联系
      </div>
      <div className="flex jc-center">
        <WrapLink
          href="/index"
          as="/"
          style={{ marginRight: "40px" }}
          className="w220 h44 r2 flex ai-center jc-center font16 bold bg-main c-white hover-white"
        >
          查看我的申请
        </WrapLink>
        <WrapLink
          href="/index"
          as="/"
          className="w220 h44 r2 flex ai-center jc-center font16 bold bg-main c-white hover-white"
        >
          回到首页
        </WrapLink>
      </div>
    </div>
    <div className="h120" />
  </Fragment>
);

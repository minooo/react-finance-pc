import { Button, message } from "antd";
import Router from "next/router";
import { cache, getCookie } from "@utils";

export default ({ item }) => {
  function onGo() {
    if (!getCookie("token")) {
      message.warn("当前操作需要登录", 2, () => {
        Router.push(
          {
            pathname: "/4-me/1-login",
            query: { href: Router.route, as: Router.asPath, requireData: 1 }
          },
          "/login"
        );
      });
      return;
    }
    if (!cache.getItem("userId")) {
      message.warn("当前操作需要完善基本资料", 2, () => {
        Router.push(
          {
            pathname: "/4-me/2-home",
            query: { href: Router.route, as: Router.asPath, requireData: 1 }
          },
          "/me"
        );
      });
      return;
    }
    if (!cache.getItem("userJob")) {
      message.warn("当前操作需要完善其他资料", 2, () => {
        Router.push(
          {
            pathname: "/4-me/3-other-data",
            query: { href: Router.route, as: Router.asPath, requireData: 1 }
          },
          "/me/other"
        );
      });
      return;
    }

    window.open(item.pc_outside_link);
  }
  return (
    <div
      role="button"
      tabIndex="-1"
      style={{ height: "126px" }}
      className="flex ai-center plr20 border-bottom transition loan-list-hover bg-white"
      onClick={onGo}
      onKeyDown={null}
    >
      <div className="w106 h66 img-bg mr15">
        <img src={item.images} alt="" className="w-100 h-100" />
      </div>
      <div
        className="flex column h56 jc-between overflow-h pr20"
        style={{ width: "310px" }}
      >
        <div className="font18 c333 lh100 text-overflow-one">{item.name}</div>
        <div className="font12 c999 lh100 text-overflow-one">
          {item.description}
        </div>
      </div>
      <div
        style={{ borderLeft: "1px solid #f2f2f2", width: "210px" }}
        className="h62 flex column jc-between plr30"
      >
        <div className="font14 c333 lh100 text-overflow-one">
          <span className="font12 c999">卡片等级：</span>
          {item.level}
        </div>
        <div className="font14 c333 lh100 text-overflow-one">
          <span className="font12 c999">系列币种：</span>
          {item.currency}
        </div>
        <div className="font14 c333 lh100 text-overflow-one">
          <span className="font12 c999">年费政策：</span>
          {(item.yearFee && item.yearFee.substr(0, 10)) || "暂无"}
        </div>
      </div>
      <div className="h56 flex column jc-center ai-center pl30">
        {/* <div className="font14 c333 lh100 text-overflow-one mb5">
        <span className="c-main">{item.apply_num || 0}人申请</span>
      </div> */}
        <Button type="primary" className="h32 w110 r100 font14 bold">
          立即申请
        </Button>
      </div>
    </div>
  );
};

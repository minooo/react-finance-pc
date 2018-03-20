import { Button, message } from "antd";
import Router from "next/router";
import { cache, getCookie } from "@utils";

export default ({ item, index }) => {
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
      style={{ width: "170px" }}
      className={`flex column ai-center ${
        (index + 1) % 4 === 0 ? "" : "mr20"
      } ${index < 4 ? "mb30" : ""}`}
      onClick={onGo}
      onKeyDown={null}
    >
      <div className="img-bg h106 w-100">
        <img src={item.images} className="w-100 h-100" alt="" />
      </div>
      <div
        style={{ maxWidth: "100%" }}
        className="h54 flex column ai-center jc-center"
      >
        <div
          style={{ maxWidth: "100%" }}
          className="font14 bold text-overflow-one c333"
        >
          {item.name}
        </div>
        <div
          style={{ maxWidth: "100%" }}
          className="font12 text-overflow-one c666"
        >
          {item.description}
        </div>
      </div>
      <Button type="primary" className="w120 h30 r2 font14 mb5">
        免费申请
      </Button>
      <div className="font12 c333">
        {/* <span className="c-main">{item.apply_num}人</span>申请 */}
      </div>
    </div>
  );
};

import { Fragment } from "react";
import uuid from "uuid/v4";
import { Layout, WrapLink } from "@components";

const selectList = [
  {
    title: "个人资料",
    one: {
      name: "基本资料",
      as: "/me",
      href: "/4-me/2-home"
    },
    other: {
      name: "其他资料",
      as: "/me/other",
      href: "/4-me/3-other-data"
    }
  },
  {
    title: "申请管理",
    one: {
      name: "贷款申请记录",
      as: "/me/loan-apply",
      href: "/4-me/4-loan-apply"
    },
    other: {
      name: "信用卡申请记录",
      as: "/me/card-apply",
      href: "/4-me/5-card-apply"
    }
  },
  {
    title: "消息管理",
    one: {
      name: "系统消息",
      as: "/me/system-message",
      href: "/4-me/6-system-message"
    },
    other: {
      name: "申请消息",
      as: "/me/apply-message",
      href: "/4-me/7-apply-message"
    }
  }
];

export default ({ children, pathname }) => (
  <Layout title="个人中心">
    <div
      className="w-100 h-100 pt20"
      style={{ backgroundColor: "#f2f2f2", paddingBottom: "60px" }}
    >
      <div className="box flex">
        {/* 左边路由部分 */}
        <div
          className="bg-body font14 pt15"
          style={{ width: "190px", height: "574px" }}
        >
          {selectList.map((item, index) => (
            <Fragment key={uuid()}>
              <div
                className="h56 flex ai-center relative c999"
                style={{ paddingLeft: "62px" }}
              >
                <div
                  className={`me-icon-${index + 1} absolute`}
                  style={{ left: "34px", top: "20px" }}
                />
                <div>{item.title}</div>
              </div>
              <WrapLink
                href={item.one.href}
                as={item.one.as}
                className={`relative h56 flex ai-center c333 ${
                  item.one.href === pathname ? "bg-white c-main" : ""
                }`}
                style={{ paddingLeft: "62px" }}
              >
                {item.one.href === pathname && (
                  <div className="me-border-left" />
                )}
                <div>{item.one.name}</div>
              </WrapLink>
              <WrapLink
                href={item.other.href}
                as={item.other.as}
                className={`h56 relative flex ai-center c333 ${
                  item.other.href === pathname ? "bg-white c-main" : ""
                }`}
                style={{ paddingLeft: "62px" }}
              >
                {item.other.href === pathname && (
                  <div className="me-border-left" />
                )}
                <div>{item.other.name}</div>
              </WrapLink>
            </Fragment>
          ))}
        </div>
        <div className="equal bg-white">{children}</div>
      </div>
    </div>
  </Layout>
);

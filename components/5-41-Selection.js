import { Fragment } from "react";
import uuid from "uuid/v4";
import { Layout, WrapLink } from "@components";

const selectList = [
  {
    title: "个人资料",
    children: [
      {
        name: "基本资料",
        as: "/me",
        href: "/4-me/2-home"
      },
      {
        name: "其他资料",
        as: "/me/other",
        href: "/4-me/3-other-data"
      }
    ]
  },
  {
    title: "申请管理",
    children: [
      {
        name: "贷款申请记录",
        as: "/me/loan-apply",
        href: "/4-me/4-loan-apply"
      }
    ]
  },
  {
    title: "消息管理",
    children: [
      {
        name: "系统消息",
        as: "/me/system-message",
        href: "/4-me/5-system-message"
      },
      {
        name: "申请消息",
        as: "/me/apply-message",
        href: "/4-me/6-apply-message"
      }
    ]
  }
];

export default ({ children, pathname }) => (
  <Layout title="个人中心">
    <div
      className="w-100 h-100 pt20"
      style={{
        backgroundColor: "#f2f2f2",
        paddingBottom: "60px"
      }}
    >
      <div className="box flex">
        {/* 左边路由部分 */}
        <div
          className="bg-body font14 pt15"
          style={{ width: "190px", height: "inherit" }}
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
              {item &&
                item.children &&
                item.children.length > 0 &&
                item.children.map(value => (
                  <WrapLink
                    key={uuid()}
                    href={value.href}
                    as={value.as}
                    className={`relative h56 flex ai-center c333 ${
                      value.href === pathname ? "bg-white c-main" : ""
                    }`}
                    style={{ paddingLeft: "62px" }}
                  >
                    {value.href === pathname && (
                      <div className="me-border-left" />
                    )}
                    <div>{value.name}</div>
                  </WrapLink>
                ))}
            </Fragment>
          ))}
        </div>
        <div
          className="equal overflow-h bg-white relative"
        >
          {children}
        </div>
      </div>
    </div>
  </Layout>
);

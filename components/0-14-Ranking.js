import React from "react";
import { Btn } from "@components";

export default ({ title, OnChangeLoahType, ranktype, bg }) => (
  <div>
    <div className="flex jc-between ai-center">
      <div className="font22 c333 lh100 bold">{title}</div>
      <div className="font16 c666 flex">
        <Btn
          onClick={() => OnChangeLoahType("new")}
          con={
            <span
              className={`mr5 pointer ${
                ranktype === "new" ? "c-main" : "c333"}`}
            >
              最新
            </span>
          }
        />
        <span>|</span>
        <Btn
          onClick={() => OnChangeLoahType("hot")}
          con={
            <span
              className={`ml5 pointer ${
                ranktype === "hot" ? "c-main" : "c333"}`}
            >
              最热
            </span>
          }
        />
      </div>
    </div>
    <div
      className={`h20 mb10 ${bg}`}
    />
  </div>
);


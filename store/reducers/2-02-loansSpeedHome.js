import { LOANS_SPEED_HOME } from "@actions";
import { addFilter } from "@utils";

const speedFilters = [
  {
    title: "贷款金额",
    key: "money_section",
    list: [{ name: "不限" }]
  },
  {
    title: "贷款期限",
    key: "timelimit",
    list: [{ name: "不限" }]
  },
  {
    title: "贷款类型",
    key: "type",
    list: [{ name: "不限" }]
  },
  {
    title: "申请资质",
    key: "aptitude",
    list: [{ name: "不限" }]
  },
  {
    title: "下款周期",
    key: "cycle",
    list: [{ name: "不限" }]
  }
]

export default (state = null, action) => {
  switch (action.type) {
    case LOANS_SPEED_HOME:
      return {
        ...state,
        ...action.payload,
        speedFilters: addFilter(action.payload, speedFilters)
      };
    default:
      return state;
  }
};

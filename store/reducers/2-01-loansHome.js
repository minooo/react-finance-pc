import { LOANS_HOME } from "@actions";
import { addFilter } from "@utils";

const cityFilters = [
  {
    title: "贷款类型",
    key: "type",
    list: [{ name: "不限" }]
  },
  {
    title: "职业身份",
    key: "identity",
    list: [{ name: "不限" }]
  },
  {
    title: "信用情况",
    key: "credit_condition",
    list: [{ name: "不限" }]
  }
]

export default (state = null, action) => {
  switch (action.type) {
    case LOANS_HOME:
      return {
        ...state,
        ...action.payload,
        money_section: [{ id: 0, name: "金额不限" }].concat(action.payload.money_section || []),
        timelimit: [{ id: 0, name: "期限不限" }].concat(action.payload.timelimit || []),
        cityFilters: addFilter(action.payload, cityFilters)
      };
    default:
      return state;
  }
};

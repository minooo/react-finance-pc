import { CARDS_HOME } from "@actions";
import { addFilter } from "@utils"

const cardFilters = [
  {
    title: "银行",
    key: "bank",
    list: [
      { name: "不限" },
    ]
  },
  {
    title: "用途",
    key: "category",
    list: [
      { name: "不限" },
    ]
  },
  {
    title: "等级",
    key: "level",
    list: [
      { name: "不限" },
    ]
  },
  {
    title: "年费",
    key: "yearFee_policy",
    list: [
      { name: "不限" },
    ]
  },
  {
    title: "币种",
    key: "currency",
    list: [
      { name: "不限" },
    ]
  }
]

export default (state = null, action) => {
  switch (action.type) {
    case CARDS_HOME:
      return {
        ...state,
        ...action.payload,
        cardFilters: addFilter(action.payload, cardFilters)
      };
    default:
      return state;
  }
};

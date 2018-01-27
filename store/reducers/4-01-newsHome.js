import { NEWS_HOME } from "@actions";

export default (state = null, action) => {
  switch (action.type) {
    case NEWS_HOME:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

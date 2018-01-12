import { HOME } from "@actions";

export default (state = null, action) => {
  switch (action.type) {
    case HOME:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

import { HOT_SEARCH } from "@actions";

export default (state = [], action) => {
  switch (action.type) {
    case HOT_SEARCH:
      return [...(action.payload.length > 0 && action.payload)];
    default:
      return state;
  }
};

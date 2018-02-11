import { USER_OTHER } from "@actions";

export default (state = null, action) => {
  switch (action.type) {
    case USER_OTHER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

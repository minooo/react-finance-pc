import { combineReducers } from "redux";
import home from "./1-01-home";
import hotSearch from "./1-02-hotSearch";
import mySearch from "./1-03-mySearch";
import loansHome from "./2-01-loansHome";
import cardsHome from "./3-01-cardsHome";
import newsHome from "./4-01-newsHome";
import user from "./5-01-user";

export default combineReducers({
  home,
  hotSearch,
  mySearch,
  loansHome,
  cardsHome,
  newsHome,
  user
});

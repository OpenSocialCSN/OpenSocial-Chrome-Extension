import { combineReducers } from "redux";
import user from "./user_reducer";
import subscriptions from "./subscriptions_reducer";

export default combineReducers({
  user,
  subscriptions
});

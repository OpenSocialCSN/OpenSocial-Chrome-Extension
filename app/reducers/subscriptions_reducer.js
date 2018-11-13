import { CLEAR_SUBSCRIPTIONS, UPDATE_SUBSCRIPTIONS } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SUBSCRIPTIONS:
      return action.payload;
    case CLEAR_SUBSCRIPTIONS:
      return [];
    default:
      return state;
  }
};

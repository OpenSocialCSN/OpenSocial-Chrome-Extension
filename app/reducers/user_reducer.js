import { UPDATE_USER, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
  authToken: null,
  userId: null,
  username: null,
  me: null // extra context data
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_USER:
      let user = action.payload;
      user.username = user.me.username;
      return user;
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};

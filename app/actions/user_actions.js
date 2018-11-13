import { UPDATE_USER, UPDATE_USER_FAIL } from "../actions/types";

export const updateUser = (user, callback) => async dispatch => {
  try {
    dispatch({ type: UPDATE_USER, payload: user });
  } catch (err) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: "Please double check all of your information."
    });
  } finally {
    callback && callback();
  }
};

export const login = (username, password, callback) => async dispatch => {};

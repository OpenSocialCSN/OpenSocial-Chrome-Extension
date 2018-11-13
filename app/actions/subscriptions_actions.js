import { getSubscriptions } from "../../chrome/extension/network/rocket-chat";
import {
  UPDATE_SUBSCRIPTIONS,
  UPDATE_SUBSCRIPTIONS_FAIL
} from "../actions/types";

export const updateSubscriptions = (user, callback) => async dispatch => {
  const { authToken, userId } = user;
  try {
    const subscriptions = await getSubscriptions(userId, authToken);
    dispatch({ type: UPDATE_SUBSCRIPTIONS, payload: subscriptions });
  } catch (error) {
    dispatch({
      type: UPDATE_SUBSCRIPTIONS_FAIL,
      payload: "Please double check all of your information."
    });
  } finally {
    callback && callback();
  }
};

import { getSubscriptions } from "../network/rocket-chat";
import { store } from "../opensocial";
import { UPDATE_SUBSCRIPTIONS, UPDATE_USER } from "../../../app/actions/types";

let user;
const pollResource = (fn, frequency) => setInterval(fn, frequency);

const updateRocketChatBadge = async () => {
  let u = await checkForUser();
  console.log("u?");

  if (!u || !u.authToken || !u.userId) return;
  console.log("got a user:", u);

  const subs = await getSubscriptions(u.userId, u.authToken);
  const numSubsUnread = subs.filter(sub => sub.unread > 0).length;
  const badgeText = numSubsUnread > 0 ? numSubsUnread.toString() : "";
  chrome.browserAction.setBadgeText({ text: badgeText });
  store.dispatch({ type: UPDATE_SUBSCRIPTIONS, payload: subs });
  store.dispatch({ type: UPDATE_USER, payload: u });
};

const checkForUser = async () => {
  return new Promise(resolve => {
    if (user) resolve(user);
    chrome.storage.local.get("state", state => {
      if (state) {
        //weird chrome storage thing, data is stored like data.data: {}
        state = JSON.parse(state.state);
        user = state.user;
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

//update rocket chat messages every 5 secs
pollResource(updateRocketChatBadge, 5000);

import { getSubscriptions } from "../network/rocket-chat";
import { store } from "../opensocial";
import { UPDATE_SUBSCRIPTIONS } from "../../../app/actions/types";
import { getUserCredentials } from "../network/rocket-chat";

const pollResource = (fn, frequency) => setInterval(fn, frequency * 1000);

let staleToken;

const updateRocketChatBadge = async () => {
  let u = await getUserCredentials();
  console.log("user:", u);
  console.log("staleToken:", staleToken);

  if (!u || !u.authToken || !u.userId || u.authToken === staleToken) return;
  let subs;
  try {
    subs = await getSubscriptions(u.userId, u.authToken);
  } catch (err) {
    // user logged out, stop polling resource until we get a new token
    staleToken = u.authToken;
    chrome.browserAction.setBadgeText({ text: "?" });
    return;
  }

  console.log("subs:", subs);

  const numSubsUnread = subs.filter(sub => sub.unread > 0).length;
  const badgeText = numSubsUnread > 0 ? numSubsUnread.toString() : "";
  chrome.browserAction.setBadgeText({ text: badgeText });
  store.dispatch({ type: UPDATE_SUBSCRIPTIONS, payload: subs });
  // store.dispatch({ type: UPDATE_USER, payload: u });
};

//update rocket chat messages every 5 secs
pollResource(updateRocketChatBadge, 5);

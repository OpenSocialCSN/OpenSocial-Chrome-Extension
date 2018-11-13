// sets initial badge on startup

chrome.storage.local.get("state", state => {
  if (state) {
    //weird chrome storage thing, data is stored like data.data: {}
    state = JSON.parse(state.state);
    let subscriptions = state.subscriptions || [];
    const count = subscriptions.filter(sub => sub.unread > 0).length;
    chrome.browserAction.setBadgeText({
      text: count > 0 ? count.toString() : ""
    });
  } else {
    // Initial, show ! to grab user attention
    chrome.browserAction.setBadgeText({ text: "!" });
  }
});

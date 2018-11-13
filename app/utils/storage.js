function saveState(state) {
  console.log("caching state:", state);

  chrome.storage.local.set({ state: JSON.stringify(state) });
}

// unread count
function setBadge(subscriptions) {
  if (chrome.browserAction) {
    const count = subscriptions.filter(sub => sub.unread > 0).length;
    chrome.browserAction.setBadgeText({
      text: count > 0 ? count.toString() : ""
    });
  }
}

export default function() {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      saveState(state);
      setBadge(state.subscriptions);
    });
    return store;
  };
}

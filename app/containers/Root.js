import React, { Component, PropTypes } from "react";
import { Provider } from "react-redux";

import App from "./App";
import { CLEAR_SUBSCRIPTIONS } from "../actions/types";

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { store } = this.props;
    const { user, subscriptions } = store.getState();
    // console.log("app mounted. state:", store.getState());

    if (user && user.authToken && user.userId) {
      let channelWithUnread = subscriptions.find(channel => channel.unread > 0);
      const uri = `https://chat.opensocial.me/channel/${
        channelWithUnread ? channelWithUnread.name : "general"
      }`;

      window.open(uri, "_blank");
      store.dispatch(CLEAR_SUBSCRIPTIONS); //remove badge count
    }
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

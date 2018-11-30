// NOTE:
// React portion is defunct, will leave in place for when
// we implement an in-extension UI

import React, { Component, PropTypes } from "react";
// import { Provider } from "react-redux";

// import App from "./App";
// import { CLEAR_SUBSCRIPTIONS } from "../actions/types";

import onExtClick from "../../chrome/extension/background/onExtClick";

export default class Root extends Component {
  // static propTypes = {
  //   store: PropTypes.object.isRequired
  // };

  async componentDidMount() {
    const { store } = this.props;
    onExtClick(store);
    // const { user, subscriptions } = store.getState();
    // // console.log("app mounted. state:", store.getState());
    // if (user && user.authToken && user.userId) {
    //   let channelWithUnread = subscriptions.find(channel => channel.unread > 0);
    //   const uri = `https://chat.opensocial.me/channel/${
    //     channelWithUnread ? channelWithUnread.name : "general"
    //   }`;
    //   window.open(uri, "_blank");
    //   store.dispatch(CLEAR_SUBSCRIPTIONS); //remove badge count
    // } else {
    //   // window.open("https://www.opensocial.me/wp-login.php", "_blank");
    //   window.open(LOGIN_URI, "_blank");
    // }
  }

  render() {
    return null;

    // const { store } = this.props;
    // return (
    //   <Provider store={store}>
    //     <App />
    //   </Provider>
    // );
  }
}

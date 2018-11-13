import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as userActions from "../actions/user_actions";
import * as subscriptionActions from "../actions/subscriptions_actions";
import Login from "../components/Login";

@connect(
  state => ({
    user: state.user,
    subscriptions: state.subscriptions
  }),
  dispatch => ({
    subscriptionActions: bindActionCreators(subscriptionActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  })
)
export default class App extends Component {
  static propTypes = {
    subscriptions: PropTypes.array.isRequired,
    userActions: PropTypes.object.isRequired
  };

  render() {
    const { subscriptionActions, userActions, user } = this.props;
    const props = {
      user,
      updateSubscriptions: subscriptionActions.updateSubscriptions,
      updateUser: userActions.updateUser
    };

    return (
      <div>
        <Login {...props} />
      </div>
    );
  }
}

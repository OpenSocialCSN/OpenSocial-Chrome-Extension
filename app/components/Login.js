import React, { PropTypes, Component } from "react";

import { loginWithUsernameAndPassword } from "../../chrome/extension/network/rocket-chat";
import style from "./Login.css";

export default class Login extends Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  state = {
    username: "",
    password: ""
  };

  login = async () => {
    const { username, password } = this.state;

    const that = this;
    try {
      const user = await loginWithUsernameAndPassword(username, password);
      that.props.updateUser(user);
      that.props.updateSubscriptions(user);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { user } = this.props;

    return user.authToken ? (
      <UserAdded user={user} />
    ) : (
      <div className={style.Login}>
        <span className={style.logoContainer}>
          <img src="https://chat.opensocial.me/assets/logo.png" height={50} />
        </span>
        <input
          type="text"
          placeholder="Username"
          onChange={e => this.setState({ username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => this.setState({ password: e.target.value })}
        />
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

const UserAdded = ({ user }) => (
  <div className={style.Login}>
    <span className={style.detailText}>
      Now tracking messages for <b>{user.username}</b>!<br />
    </span>{" "}
    <button style={{ marginTop: 20 }} onClick={window.close}>
      Got it
    </button>
  </div>
);

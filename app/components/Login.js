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

    return (
      <div className={style.Login}>
        {user.authToken ? (
          <UserAdded user={user} />
        ) : (
          <div>
            <h1>
              Login to <br />
              rocket.chat
            </h1>
            <input
              type="text"
              placeholder="username"
              onChange={e => this.setState({ username: e.target.value })}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={e => this.setState({ password: e.target.value })}
            />
            <br />
            <button onClick={this.login}>Login</button>
          </div>
        )}
      </div>
    );
  }
}

const UserAdded = ({ user }) => (
  <div>
    <span>
      Now tracking messages for <b>{user.username}</b>!<br />
    </span>{" "}
    <button style={{ marginTop: 20 }} onClick={window.close}>
      Got it
    </button>
  </div>
);

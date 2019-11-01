import React, { PureComponent } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router';

class UserLogin extends PureComponent {
  state = {
    users: [],
    usernameInput: '',
    password: 'admin',
    passwordInput: '',
    err: null
  };

  render() {
    if (this.props.user !== 'guest') {
      return (
        <div>
          <p>Already Logged In. Logout?</p>
          <form onSubmit={this.handleLogoutSubmit}>
            <button type="submit">Logout</button>
          </form>
        </div>
      );
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="username"
            onChange={this.handleChange}
            value={this.state.usernameInput}
          />
          <input
            type="password"
            placeholder="password"
            onChange={this.handlePasswordChange}
            value={this.state.passwordInput}
          />
          <button
            type="submit"
            disabled={this.state.passwordInput !== this.state.password}
          >
            enter
          </button>
        </form>
        {this.state.err && <p>{this.state.err}</p>}
      </div>
    );
  }

  componentDidMount() {
    api.getUsers().then(users => {
      this.setState({ users });
    });
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ usernameInput: event.target.value });
  };

  handlePasswordChange = event => {
    event.preventDefault();
    this.setState({ passwordInput: event.target.value });
  };

  handleSubmit = event => {
    const { updateUser } = this.props;
    event.preventDefault();
    if (this.state.users.includes(this.state.usernameInput)) {
      localStorage.setItem('loggedInUser', this.state.usernameInput);
      updateUser(this.state.usernameInput);
      this.setState({ usernameInput: '', passwordInput: '', err: null });
      navigate('/');
    } else {
      this.setState({
        usernameInput: '',
        passwordInput: '',
        err: 'username or password not recognised - please try again.'
      });
    }
  };

  handleLogoutSubmit = event => {
    const { logOutUser } = this.props;
    event.preventDefault();
    localStorage.removeItem('loggedInUser');
    logOutUser();
    navigate('/');
  };
}

export default UserLogin;

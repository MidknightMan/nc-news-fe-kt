import React, { PureComponent } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

class UserProfile extends PureComponent {
  state = { isLoading: true, userInfo: {}, err: null };

  render() {
    if (this.state.isLoading) return <p>Loading...</p>;
    if (this.props.user === 'guest')
      return (
        <>
          <p>Not Logged In...</p>
          <Link to="/login">Login</Link>
        </>
      );
    return (
      <>
        <p>Information for: {this.props.user}</p>
        <p>Username: {this.state.user.username}</p>
        <img src={this.state.user.avatar_url} alt={this.state.user.username} />
      </>
    );
  }

  componentDidMount() {
    api
      .getUserInfo(this.props.user)
      .then(user => {
        this.setState({ user, isLoading: false, err: null });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          err: { status: err.response.status, msg: err.response.data.msg }
        });
      });
  }
}

export default UserProfile;

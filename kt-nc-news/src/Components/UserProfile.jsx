import React, { PureComponent } from 'react';
import * as api from '../api';

class UserProfile extends PureComponent {
  state = { isLoading: true, userInfo: {}, err: null };

  render() {
    if (this.state.isLoading) return <p>Loading...</p>;
    return (
      <>
        <p>Information for: {this.props.user}</p>
        <p>Username: {this.state.user.username}</p>
        <img src={this.state.user.avatar_url} alt={this.state.user.username} />
      </>
    );
  }

  componentDidMount() {
    api.getUserInfo(this.props.user).then(user => {
      this.setState({ user, isLoading: false });
    });
  }
}

export default UserProfile;

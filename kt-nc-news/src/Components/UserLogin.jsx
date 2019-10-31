import React, { PureComponent } from 'react';
import * as api from '../api';

class UserLogin extends PureComponent {
  state = { users: [] };

  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="username" />
          <button>enter</button>
        </form>
      </div>
    );
  }

  componentDidUpdate() {
    api.getUsers().then(users => {
      this.setState({ users });
    });
  }
}

export default UserLogin;

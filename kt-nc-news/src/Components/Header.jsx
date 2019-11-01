import React, { PureComponent } from 'react';
import { Link } from '@reach/router';

class Header extends PureComponent {
  state = {};

  render() {
    return (
      <div className="header">
        <header>
          <h1>in the know</h1>
          <h2>Logged in as: {this.props.user}</h2>
        </header>
        <nav>
          <Link to="/articles">All</Link>{' '}
          <Link to="/articles/topic/cooking">Cooking</Link>{' '}
          <Link to="/articles/topic/football">Football</Link>{' '}
          <Link to="/articles/topic/coding">Coding</Link>{' '}
          <Link to="/myprofile">My Profile</Link>{' '}
          {this.props.user === 'guest' ? (
            <Link to="/login">Login</Link>
          ) : (
            <Link to="/login">Logout</Link>
          )}
        </nav>
      </div>
    );
  }
}

export default Header;

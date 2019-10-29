import React, { PureComponent } from 'react';
import { Link } from '@reach/router';

class Header extends PureComponent {
  state = {};

  render() {
    return (
      <div className="header">
        <header>
          <h1>in the know</h1>
        </header>
        <nav>
          <Link to="/">Home</Link> <Link to="/cooking">Cooking</Link>{' '}
          <Link to="/football">Football</Link> <Link to="/coding">Coding</Link>{' '}
          <Link to="/myprofile">My Profile</Link>
        </nav>
      </div>
    );
  }
}

export default Header;

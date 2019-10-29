import React, { PureComponent } from 'react';

class SearchBox extends PureComponent {
  state = { searchString: '' };

  render() {
    return (
      <label id="searchBox" className="search">
        <input type="text" placeholder="Search" />
      </label>
    );
  }
}

export default SearchBox;

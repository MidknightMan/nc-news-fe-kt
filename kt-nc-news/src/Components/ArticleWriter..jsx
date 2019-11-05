import React, { PureComponent } from 'react';
import { Link } from '@reach/router';

class ArticleWriter extends PureComponent {
  state = {
    articleBody: ''
  };

  render() {
    if (this.props.user === 'guest')
      return (
        <div>
          <p>Please login to add an article</p>
          <Link to="/login">Login</Link>
        </div>
      );
    return (
      <div>
        <form className="articleWriterContainer">
          <textarea
            className="articleTitleBox"
            cols="100"
            rows="1"
            placeholder="article title"
            required
          ></textarea>

          <textarea
            className="articleBodyBox"
            name="articlebody"
            id="articleBody"
            cols="100"
            rows="10"
            placeholder="write your article here"
            onChange={this.handleBodyChange}
            required
          ></textarea>

          <label className="topicDropDown">
            Topic:
            <select name="topicDropDownBar" id="sortBy" required>
              <option value="cooking">Cooking</option>
              <option value="coding">Coding</option>
              <option value="football">Football</option>
            </select>
          </label>
          <button
            disabled={this.props.user === 'guest' ? true : false}
            type="submit"
            className="submitArticle"
          >
            Add Article
          </button>
        </form>
      </div>
    );
  }

  handleBodyChange = event => {
    event.preventDefault();
    this.setState({ articleBody: event.target.value });
  };
}

export default ArticleWriter;

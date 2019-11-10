import React, { PureComponent } from 'react';
import { Link, navigate } from '@reach/router';
import * as api from '../api';

class ArticleWriter extends PureComponent {
  state = {
    articleBody: '',
    topic: 'cooking',
    articleTitle: ''
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
        <form
          className="articleWriterContainer"
          onSubmit={this.handleSubmitArticle}
        >
          <textarea
            className="articleTitleBox"
            cols="100"
            rows="1"
            placeholder="article title"
            required
            onChange={this.handleTitleChange}
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
            <select
              name="topicDropDownBar"
              id="sortBy"
              required
              onChange={this.handleTopicChange}
            >
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

  handleTopicChange = event => {
    event.preventDefault();
    this.setState({ topic: event.target.value });
  };

  handleTitleChange = event => {
    event.preventDefault();
    this.setState({ articleTitle: event.target.value });
  };

  handleSubmitArticle = event => {
    event.preventDefault();
    const { articleTitle, topic, articleBody } = this.state;
    const { user } = this.props;
    api
      .addArticle(articleTitle, user, topic, articleBody)
      .then(addedArticle => {
        if (addedArticle) {
          this.setState({
            articleBody: '',
            topic: 'cooking',
            articleTitle: ''
          });
          navigate('/');
        }
      });
  };
}

export default ArticleWriter;

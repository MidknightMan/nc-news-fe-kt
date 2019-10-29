import React, { PureComponent } from 'react';
import * as api from '../api';
import ArticleCard from './ArticleCard';

class ArticleList extends PureComponent {
  state = {
    articles: [],
    isLoading: true,
    sortBy: 'created_at',
    orderBy: 'desc'
  };
  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>;
    return (
      <div className="articleList">
        <label>
          Sort-By:
          <select name="sortBy" id="sortBy" onChange={this.handleSortChange}>
            <option value="created_at">Date Created (Default) </option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="votes">Votes</option>
            <option value="topic">Topic</option>
            <option value="comment_count">Comment Count</option>
          </select>
        </label>
        <label>
          Order-By:
          <select name="sortBy" id="sortBy" onChange={this.handleOrderChange}>
            <option value="desc">Descending (Default) </option>
            <option value="asc">Ascending</option>
          </select>
        </label>
        <ul>
          {articles.map(article => {
            return (
              <ArticleCard
                article={article}
                key={article.article_id}
                className="articleCard"
              />
            );
          })}
        </ul>
      </div>
    );
  }

  handleSortChange = event => {
    event.preventDefault();
    this.setState({ sortBy: event.target.value });
  };

  handleOrderChange = event => {
    event.preventDefault();
    this.setState({ orderBy: event.target.value });
  };

  componentDidMount() {
    api.GetAllArticles().then(articles => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.sortBy !== prevState.sortBy ||
      this.state.orderBy !== prevState.orderBy
    ) {
      api
        .GetAllArticles(this.state.sortBy, this.state.orderBy)
        .then(articles => {
          this.setState({ articles, isLoading: false });
        });
    }
  }
}

export default ArticleList;

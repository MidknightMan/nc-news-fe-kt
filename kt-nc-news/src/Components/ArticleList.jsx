import React, { PureComponent } from 'react';
import * as api from '../api';
import ArticleCard from './ArticleCard';
import ErrorDisplay from './ErrorDisplay';

class ArticleList extends PureComponent {
  state = {
    articles: [],
    isLoading: true,
    sortBy: 'created_at',
    orderBy: 'desc',
    err: null
  };
  render() {
    const topic = this.props.topic;
    const { articles, isLoading, err } = this.state;
    if (isLoading) return <p>Loading...</p>;
    if (err) return <ErrorDisplay err={err} />;
    return (
      <div>
        <div>
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
                  path={this.props.path}
                  topicName={topic}
                />
              );
            })}
          </ul>
        </div>
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
    const topic = this.props.topic;
    if (topic === 'cooking' || topic === 'football' || topic === 'coding') {
      api
        .GetAllArticles(this.state.sortBy, this.state.orderBy, topic)
        .then(articles => {
          this.setState({ articles, isLoading: false });
        });
    } else {
      api.GetAllArticles().then(articles => {
        this.setState({ articles, isLoading: false });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let topic = this.props.topic;
    if (topic === 'articles') {
      topic = undefined;
    }
    if (
      this.state.sortBy !== prevState.sortBy ||
      this.state.orderBy !== prevState.orderBy
    ) {
      api
        .GetAllArticles(this.state.sortBy, this.state.orderBy, topic)
        .then(articles => {
          this.setState({ articles, isLoading: false });
        });
    }
    if (this.props.topic !== prevProps.topic) {
      if (topic === 'cooking' || topic === 'football' || topic === 'coding') {
        api
          .GetAllArticles(this.state.sortBy, this.state.orderBy, topic)
          .then(articles => {
            this.setState({ articles, isLoading: false });
          });
      } else {
        api.GetAllArticles().then(articles => {
          this.setState({ articles, isLoading: false });
        });
      }
    }
  }
}

export default ArticleList;

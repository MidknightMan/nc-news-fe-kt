import React, { PureComponent } from 'react';
import * as api from '../api';
import ArticleCard from './ArticleCard';
import ErrorDisplay from './ErrorDisplay';
import { Link } from '@reach/router';

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
    if (isLoading) return <p>Loading articles...</p>;
    if (err)
      return (
        <div>
          <ErrorDisplay err={err} />
          <Link to="/articles">Back To Articles</Link>
        </div>
      );
    return (
      <div>
        <div>
          <label className="sortByDropDown">
            Sort-By:
            <select name="sortBy" id="sortBy" onChange={this.handleSortChange}>
              <option value="created_at">Date Created </option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="votes">Votes</option>
              <option value="topic">Topic</option>
              <option value="comment_count">Comment Count</option>
            </select>
          </label>
          {'      '}
          <label>
            Order-By:
            <select name="sortBy" id="sortBy" onChange={this.handleOrderChange}>
              <option value="desc">Descending </option>
              <option value="asc">Ascending</option>
            </select>
          </label>
          <Link to="/articles/addarticle">Add Article</Link>
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
          this.setState({ articles, isLoading: false, err: null });
        });
    } else {
      api
        .GetAllArticles(this.state.sortBy, this.state.orderBy, topic)
        .then(articles => {
          this.setState({ articles, isLoading: false, err: null });
        })
        .catch(err => {
          this.setState({
            isLoading: false,
            err: { status: 400, msg: 'bad request' }
          });
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let topic = this.props.topic;
    // if (topic === 'articles') {
    //   topic = undefined;
    // }
    if (
      this.state.sortBy !== prevState.sortBy ||
      this.state.orderBy !== prevState.orderBy
    ) {
      api
        .GetAllArticles(this.state.sortBy, this.state.orderBy, topic)
        .then(articles => {
          this.setState({ articles, isLoading: false });
        })
        .catch(err => {
          this.setState({
            isLoading: false,
            err: { status: 400, msg: 'bad request' }
          });
        });
    }
    if (this.props.topic !== prevProps.topic) {
      if (topic === 'cooking' || topic === 'football' || topic === 'coding') {
        api
          .GetAllArticles(this.state.sortBy, this.state.orderBy, topic)
          .then(articles => {
            this.setState({ articles, isLoading: false, err: null });
          });
      } else {
        api
          .GetAllArticles(this.state.sortBy, this.state.orderBy, topic)
          .then(articles => {
            this.setState({ articles, isLoading: false, err: null });
          })
          .catch(err => {
            this.setState({
              isLoading: false,
              err: { status: 400, msg: 'bad request' }
            });
          });
      }
    }
    if (!topic && prevProps.topic) {
      api
        .GetAllArticles(this.state.sortBy, this.state.orderBy, topic)
        .then(articles => {
          this.setState({ articles, isLoading: false, err: null });
        });
    }
  }
}

export default ArticleList;

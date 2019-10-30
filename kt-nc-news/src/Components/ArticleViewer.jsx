import React, { PureComponent } from 'react';
import Comments from './Comments';
import * as api from '../api';

class ArticleViewer extends PureComponent {
  state = { isLoading: true, article: {} };

  render() {
    const { isLoading, article } = this.state;
    if (isLoading) return <p>Article Loading...</p>;
    if (article === {}) return <p>Please select an article</p>;
    return (
      <div className="articleViewer">
        <main>
          <p>Title: {article.title}</p>
          <p>Author: {article.author}</p>
          <p>Topic: {article.topic}</p>
          <button onClick={this.handleVote} value="-1">
            -
          </button>
          <p>Votes: {article.votes}</p>
          <button onClick={this.handleVote} value="1">
            +
          </button>
          <p>{article.body}</p>
        </main>
        <Comments article_id={this.props.article_id} user={this.props.user} />
      </div>
    );
  }

  handleVote = event => {
    let {
      article: { votes }
    } = this.state;
    votes = votes + parseInt(event.target.value);
    this.setState(currentState => {
      return { article: { ...currentState.article, votes } };
    });
  };

  componentDidMount() {
    api.getArticleById(this.props.article_id).then(article => {
      this.setState({ article, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, PrevState) {
    if (this.props.article_id !== prevProps.article_id) {
      api.getArticleById(this.props.article_id).then(article => {
        this.setState({ article, isLoading: false });
      });
    }
  }
}

export default ArticleViewer;

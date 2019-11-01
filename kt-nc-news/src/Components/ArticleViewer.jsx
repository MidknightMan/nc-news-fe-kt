import React, { PureComponent } from 'react';
import Comments from './Comments';
import * as api from '../api';
import VoteButtons from './VoteButtons';
import ErrorDisplay from '../Components/ErrorDisplay';
import Loading from '../Components/Loading';

class ArticleViewer extends PureComponent {
  state = { isLoading: true, article: {}, err: null };

  render() {
    const { isLoading, article, err } = this.state;
    if (isLoading) return <Loading active />;
    if (article === {}) return <p>Please select an article</p>;
    if (err) return <ErrorDisplay err={err} />;
    return (
      <div>
        <main>
          <p>Title: {article.title}</p>
          <p>Author: {article.author}</p>
          <p>Topic: {article.topic}</p>
          <VoteButtons
            id={article.article_id}
            existingVotes={article.votes}
            section={'articles'}
          />
          <p>{article.body}</p>
        </main>
        <Comments article_id={this.props.article_id} user={this.props.user} />
      </div>
    );
  }

  componentDidMount() {
    api
      .getArticleById(this.props.article_id)
      .then(article => {
        this.setState({ article, isLoading: false });
      })
      .catch(err => {
        this.setState({
          err: {
            status: err.response.status || 404,
            msg: err.response.data.msg || 'article not found'
          },
          isLoading: false
        });
      });
  }

  componentDidUpdate(prevProps, PrevState) {
    if (this.props.article_id !== prevProps.article_id) {
      api.getArticleById(this.props.article_id).then(article => {
        this.setState({ article, isLoading: false, err: null });
      });
    }
  }
}

export default ArticleViewer;

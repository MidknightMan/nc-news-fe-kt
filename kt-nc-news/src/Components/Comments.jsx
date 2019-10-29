import React, { PureComponent } from 'react';
import * as api from '../api';
import CommentTextBox from './CommentTextBox';
import { navigate } from '@reach/router';

class Comments extends PureComponent {
  state = {
    comments: [],
    isLoading: true,
    newComment: null,
    user: null,
    trigger: true
  };

  render() {
    const { comments, isLoading } = this.state;
    if (isLoading) return <p>Loading Comments...</p>;
    return (
      <label>
        Comments:
        <ul>
          {comments.map((comment, i) => {
            return (
              <div key={i}>
                <p key={i}>
                  comment: {comment.body} author: {comment.author}
                </p>
                <button
                  onClick={this.handleCommentDelete}
                  value={comment.author}
                  name={comment.comment_id}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
        <section>
          <CommentTextBox
            user={this.props.user}
            postComment={this.postComment}
          />
        </section>
      </label>
    );
  }

  componentDidMount() {
    api.getCommentsByArticle(this.props.article_id).then(comments => {
      this.setState({ comments, isLoading: false, user: this.props.user });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.newComment !== prevState.newComment) {
      api
        .postCommentByArticle(
          this.props.user,
          this.state.newComment,
          this.props.article_id
        )
        .then(addedComment => {
          api.getCommentsByArticle(this.props.article_id).then(comments => {
            this.setState({ comments, isLoading: false });
          });
        });
    }
    if (this.props.article_id !== prevProps.article_id) {
      api.getCommentsByArticle(this.props.article_id).then(comments => {
        this.setState({ comments, isLoading: false });
      });
    }
    if (this.state.trigger) {
      api.getCommentsByArticle(this.props.article_id).then(comments => {
        this.setState({ comments, isLoading: false, trigger: false });
      });
    }
  }

  postComment = body => {
    this.setState({ newComment: body });
  };

  handleCommentDelete = event => {
    const commentId = event.target.name;
    const commentAuthor = event.target.value;
    if (commentAuthor === this.state.user) {
      api.deleteSelectedComment(commentId).then(() => {
        this.setState({ trigger: true });
      });
    } else alert('cannot delete comments which are not yours');
  };
}

export default Comments;

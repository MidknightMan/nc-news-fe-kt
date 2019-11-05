import React, { PureComponent } from 'react';
import * as api from '../api';
import CommentTextBox from './CommentTextBox';
import VoteButtons from './VoteButtons';

class Comments extends PureComponent {
  state = {
    comments: [],
    isLoading: true,
    newComment: null,
    user: null,
    trigger: true,
    commentVoteTrigger: false
  };

  render() {
    const { comments, isLoading } = this.state;
    if (isLoading) return <p>Loading Comments...</p>;
    return (
      <main className="commentsContainer">
        <p>Comments:</p>
        <section>
          <CommentTextBox
            user={this.props.user}
            postComment={this.postComment}
          />
        </section>
        <ul>
          {comments.map((comment, i) => {
            return (
              <div key={i} id="commentCard">
                <p key={i} id="commentText">
                  comment: {comment.body}
                </p>
                <p key={comment.comment_id} id="commentAuthor">
                  author: {comment.author}
                </p>
                {comment.author === this.state.user && (
                  <button
                    onClick={this.handleCommentDelete}
                    value={comment.author}
                    name={comment.comment_id}
                    className="commentDelete"
                  >
                    Delete
                  </button>
                )}
                <VoteButtons
                  id={comment.comment_id}
                  existingVotes={comment.votes}
                  section={'comments'}
                />
              </div>
            );
          })}
        </ul>
      </main>
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
        this.setState({
          comments,
          isLoading: false,
          trigger: false
        });
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

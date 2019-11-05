import React, { PureComponent } from 'react';

class CommentTextBox extends PureComponent {
  state = {
    commentBody: '',
    user: null,
    isLoading: true
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>;
    if (this.props.user === 'guest') return <p>Please login to add comments</p>;
    return (
      <form onSubmit={this.handleSubmit} className="commentTBContainer">
        {/* <input
          type="text"
          placeholder="Insert Your Comment Here"
          onChange={this.handleChange}
          value={this.state.commentBody}
          required
        /> */}
        <textarea
          name="commentBodyText"
          id="commentBodyText"
          cols="30"
          rows="10"
          placeholder="Insert Your Comment Here"
          onChange={this.handleChange}
          value={this.state.commentBody}
          required
        ></textarea>
        <button
          disabled={this.state.user === 'guest' ? true : false}
          type="submit"
          id="commentSubmit"
        >
          Submit Comment
        </button>
      </form>
    );
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({ commentBody: event.target.value });
  };

  handleSubmit = event => {
    if (this.state.user) {
      event.preventDefault();
      this.props.postComment(this.state.commentBody);
      this.setState({ commentBody: '' });
    } else alert('comment cannot be posted - please login');
  };

  componentDidMount() {
    this.setState({ user: this.props.user, isLoading: false });
  }
}

export default CommentTextBox;

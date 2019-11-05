import React, { PureComponent } from 'react';
import * as api from '../api';

class VoteButtons extends PureComponent {
  state = {
    vote: 0,
    err: null
  };

  handleVote = event => {
    const voteInfo = parseInt(event.target.value);
    const { id, section } = this.props;

    api.updateVote(id, voteInfo, section).catch(err => {
      this.setState({
        vote: 0,
        err: { status: 500, msg: 'Soz... pls try again later' }
      });
    });
    this.setState(currentState => {
      return { vote: currentState.vote + voteInfo };
    });
  };

  render() {
    const { existingVotes } = this.props;
    const { vote, err } = this.state;
    return (
      <div className="votingButtons">
        <button
          disabled={vote === -1 ? true : false}
          onClick={this.handleVote}
          value="-1"
          id="downvote"
        >
          -
        </button>
        <p className="voteText">Votes: {existingVotes + vote}</p>
        {err && (
          <p>
            {err.status}: {err.msg}
          </p>
        )}
        <button
          disabled={vote === 1 ? true : false}
          onClick={this.handleVote}
          value="1"
          id="upvote"
        >
          +
        </button>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ vote: 0 });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({ vote: 0 });
    }
  }
}

export default VoteButtons;

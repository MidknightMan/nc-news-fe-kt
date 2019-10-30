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
    this.setState({ vote: voteInfo });
  };

  render() {
    const { existingVotes } = this.props;
    const { vote, err } = this.state;
    return (
      <>
        <button
          disabled={vote === 0 ? false : true}
          onClick={this.handleVote}
          value="-1"
        >
          -
        </button>
        <p>Votes: {existingVotes + vote}</p>
        {err && (
          <p>
            {err.status}: {err.msg}
          </p>
        )}
        <button
          disabled={vote === 0 ? false : true}
          onClick={this.handleVote}
          value="1"
        >
          +
        </button>
      </>
    );
  }
}

export default VoteButtons;

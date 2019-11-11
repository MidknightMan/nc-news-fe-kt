import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import HeaderX from './Components/HeaderX';
import Ticker from './Components/Ticker';
import ArticleList from './Components/ArticleList';
import UserProfile from './Components/UserProfile';
import ErrorDisplay from './Components/ErrorDisplay';
import ArticleViewer from './Components/ArticleViewer';
import * as api from './api';
import UserLogin from './Components/UserLogin';
import ArticleWriter from './Components/ArticleWriter.';

class App extends React.Component {
  state = {
    user: 'guest',
    trigger1: false,
    isLoading: true,
    topics: []
  };

  render() {
    if (this.isLoading) return <p>Loading ...</p>;
    return (
      <div className="App">
        <div className="app-box">
          <div className="header">
            <HeaderX user={this.state.user} />
          </div>
          <div className="tickerBox">
            <Ticker />
          </div>
          <div className="routedContent">
            <Router>
              <UserLogin
                path="/login"
                updateUser={this.updateUser}
                user={this.state.user}
                logOutUser={this.logOutUser}
              />

              <ArticleList path="/" topics={this.state.topics} />
              <ArticleList path="/articles" topics={this.state.topics} />
              <ArticleList
                path="/articles/topic/:topic"
                topics={this.state.topics}
              />
              <ArticleWriter
                path="/articles/addarticle"
                user={this.state.user}
              />
              <ErrorDisplay
                default
                err={{ status: 404, msg: 'incorrect path' }}
              />

              <UserProfile path="/myprofile" user={this.state.user} />

              <ArticleViewer
                user={this.state.user}
                path="/articles/:article_id"
              />
            </Router>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      api.getTopics().then(topics => {
        this.setState({ topics, isLoading: false });
      });
    } else {
      api.getTopics().then(topics => {
        this.setState({ topics, isLoading: false, user: loggedInUser });
      });
    }
  }

  updateUser = user => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser === user) this.setState({ user: loggedInUser });
  };

  logOutUser = () => {
    this.setState({ user: 'guest' });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if(this.state.user !== prevState.user) {

  //   }
  // }
}

export default App;

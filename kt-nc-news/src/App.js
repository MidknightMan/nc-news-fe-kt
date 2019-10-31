import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Header from './Components/Header';
import Ticker from './Components/Ticker';
import ArticleList from './Components/ArticleList';
import SearchBox from './Components/SearchBox';
import UserProfile from './Components/UserProfile';
import ErrorDisplay from './Components/ErrorDisplay';
import ArticleViewer from './Components/ArticleViewer';
import * as api from './api';
import UserLogin from './Components/UserLogin';

class App extends React.Component {
  state = {
    user: 'jessjelly',
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
            <Header user={this.state.user} />
          </div>
          <div className="tickerBox">
            <Ticker />
          </div>
          <div className="search">
            <SearchBox />
          </div>
          <div className="routedContent">
            <Router>
              <UserLogin path="/login" />
              <ArticleList path="/" />
              <ArticleList path="/articles" />
              <ArticleList path="/articles/topic/:topic" />
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
    api.getTopics().then(topics => {
      return this.setState({ topics, isLoading: false });
    });
  }
}

export default App;

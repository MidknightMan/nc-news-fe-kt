import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Header from './Components/Header';
import Ticker from './Components/Ticker';
import ArticleList from './Components/ArticleList';
import SearchBox from './Components/SearchBox';
import ArticleViewer from './Components/ArticleViewer';
import UserProfile from './Components/UserProfile';
import ErrorDisplay from './Components/ErrorDisplay';

class App extends React.Component {
  state = {
    user: 'jessjelly',
    trigger1: false,
    isLoading: true
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
          <div className="myprofile">
            <Router>
              <UserProfile path="/myprofile" user={this.state.user} />
            </Router>
          </div>
          <div className="articleList">
            <Router>
              <ArticleList path="/" />
              <ArticleList path="/articles/*" />
              <ArticleList path="/cooking/*" />
              <ArticleList path="/football/*" />
              <ArticleList path="/coding/*" />
            </Router>
          </div>
          <div className="articleViewer">
            <Router>
              <ArticleViewer
                user={this.state.user}
                path="/articles/:article_id"
              />
              <ArticleViewer
                user={this.state.user}
                path="/cooking/:article_id"
              />
              <ArticleViewer
                user={this.state.user}
                path="/football/:article_id"
              />
              <ArticleViewer
                user={this.state.user}
                path="/coding/:article_id"
              />
            </Router>
          </div>
          <div className="errorDisplay">
            <Router>
              <ErrorDisplay
                default
                err={{ status: 404, msg: 'incorrect path' }}
              />
            </Router>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }
}

export default App;

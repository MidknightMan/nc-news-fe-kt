import React from 'react';
import styles from '../Styling Extra/ticker.module.css';
import { Link } from '@reach/router';
import * as api from '../api';

class Ticker extends React.Component {
  state = {
    articles: [],
    isLoading: true
  };
  render() {
    const { articles, isLoading } = this.state;
    console.log(articles);
    if (isLoading) return <p>Ticker Loading...</p>;
    return (
      <div className={styles.tickerWrap}>
        <div className={styles.ticker}>
          <div className={styles.ticker__item}>
            {articles.map(article => {
              return (
                <Link
                  to={`/articles/${article.article_id}`}
                  key={article.article_id}
                >
                  {article.title} {'   ||   '}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    api.GetAllArticles().then(articles => {
      this.setState({ articles, isLoading: false });
    });
  }
}

export default Ticker;

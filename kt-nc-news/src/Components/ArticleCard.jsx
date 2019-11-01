import React from 'react';
import { Link } from '@reach/router';

function ArticleCard({ article }) {
  return (
    <section id="articleCard">
      <Link to={`/articles/${article.article_id}`}>
        <div className="articleCardContainer">
          <p className="articleCardTitle">Title: {article.title}</p>
          <p className="articleCardAuthor">Author: {article.author}</p>
          <p className="articleCardTopic">Topic: {article.topic}</p>
          <p className="articleCardVotes">Votes: {article.votes}</p>
          <div className="articleCardComments">
            <img
              src="https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-004_comment_chat-512.png"
              alt="comment count"
              height="20"
              width="20"
            />{' '}
            {article.comment_count}
          </div>
          <p className="articleCardDate">
            Created at: {new Date(article.created_at).getDate()}-
            {new Date(article.created_at).getMonth()}-
            {new Date(article.created_at).getFullYear()}
          </p>
        </div>
      </Link>
    </section>
  );
}

export default ArticleCard;

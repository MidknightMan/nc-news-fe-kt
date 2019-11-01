import React from 'react';
import { Link } from '@reach/router';

function ArticleCard({ article }) {
  return (
    <section id="articleCard">
      <Link to={`/articles/${article.article_id}`}>
        <p>
          Title: {article.title}, Author: {article.author} ||{' '}
        </p>
        <p>Votes: {article.votes}</p>
        <img
          src="https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-004_comment_chat-512.png"
          alt="comment count"
          height="20"
          width="20"
        />
        <p>{article.comment_count}</p>
        <p>
          Created at: {new Date(article.created_at).getDate()}-
          {new Date(article.created_at).getMonth()}-
          {new Date(article.created_at).getFullYear()}
        </p>
      </Link>
    </section>
  );
}

export default ArticleCard;

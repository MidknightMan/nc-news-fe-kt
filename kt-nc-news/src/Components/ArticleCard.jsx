import React from 'react';
import { Link } from '@reach/router';

function ArticleCard({ article, props, topicName }) {
  // let topic = '';
  // if (topicName === undefined) {
  //   topic = undefined;
  // } else {
  //   topic = topicName || 'articles';
  // }

  // if (topic === 'cooking' || topic === 'football' || topic === 'coding') {
  //   return (
  //     <section id="articleCard">
  //       <Link to={`/${topic}/${article.article_id}`}>
  //         <p>
  //           Title: {article.title}, Author: {article.author} ||{' '}
  //         </p>
  //         <p>Votes: {article.votes}</p>
  //         <img
  //           src="https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-004_comment_chat-512.png"
  //           alt="comment count"
  //           height="20"
  //           width="20"
  //         />
  //         <p>{article.comment_count}</p>
  //       </Link>
  //     </section>
  //   );
  // } else {
  //   return (
  //     <section id="articleCard">
  //       <Link to={`/articles/${article.article_id}`}>
  //         <p>
  //           Title: {article.title}, Author: {article.author} ||{' '}
  //         </p>
  //         <p>Votes: {article.votes}</p>
  //         <img
  //           src="https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-004_comment_chat-512.png"
  //           alt="comment count"
  //           height="20"
  //           width="20"
  //         />
  //         <p>{article.comment_count}</p>
  //       </Link>
  //     </section>
  //   );
  // }

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
      </Link>
    </section>
  );
}

export default ArticleCard;

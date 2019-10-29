import axios from 'axios';

export const GetAllArticles = (sortBy, orderBy) => {
  return axios
    .get('https://nc-news-kst.herokuapp.com/api/articles', {
      params: {
        sort_by: sortBy,
        order: orderBy
      }
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getArticleById = articleId => {
  return axios
    .get(`https://nc-news-kst.herokuapp.com/api/articles/${articleId}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const getCommentsByArticle = articleId => {
  return axios
    .get(`https://nc-news-kst.herokuapp.com/api/articles/${articleId}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const postCommentByArticle = (user, body, articleId) => {
  return axios
    .post(
      `https://nc-news-kst.herokuapp.com/api/articles/${articleId}/comments`,
      { username: user, body }
    )
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const deleteSelectedComment = commentId => {
  return axios
    .delete(`https://nc-news-kst.herokuapp.com/api/comments/${commentId}`)
    .then(({ data: { comment } }) => {
      return comment;
    });
};

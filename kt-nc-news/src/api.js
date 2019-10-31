import axios from 'axios';

export const GetAllArticles = (sortBy, orderBy, topicSelected) => {
  return axios
    .get('https://nc-news-kst.herokuapp.com/api/articles', {
      params: {
        sort_by: sortBy,
        order: orderBy,
        topic: topicSelected
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

export const updateVote = (id, vote, section) => {
  return axios
    .patch(`https://nc-news-kst.herokuapp.com/api/${section}/${id}`, {
      inc_votes: vote
    })
    .then(({ data }) => {
      return data;
    });
};

export const getUserInfo = user => {
  return axios
    .get(`https://nc-news-kst.herokuapp.com/api/users/${user}`)
    .then(({ data: { user } }) => {
      return user;
    });
};

export const getTopics = async () => {
  const topics = await axios.get(
    `https://nc-news-kst.herokuapp.com/api/topics/`
  );
  return topics.data.topics.map(topic => {
    return topic.slug;
  });
};

export const getUsers = async () => {
  const users = await axios.get(`https://nc-news-kst.herokuapp.com/api/users/`);
  return users.data.users.map(user => {
    return user.username;
  });
  // return topics.data.topics.map(topic => {
  //   return topic.slug;
  // });
};

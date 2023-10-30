const _ = require('lodash');

const dummy = () => 1

const totalLikes = (blogs) => blogs.reduce((sum, obj) => sum + obj.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const mostLiked = blogs.reduce((prev, current) => (current.likes > prev.likes ? current : prev));

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };
};

const mostBlogs = (blogs) => {
  const result = _.chain(blogs)
  .groupBy('author')
  .map((authorBlogs, author) => ({ author, blogs: authorBlogs.length }))
  .orderBy(['blogs'], ['desc'])
  .value();

  if (result.length === 0) {
    return null;
  } else {
    return result[0];
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
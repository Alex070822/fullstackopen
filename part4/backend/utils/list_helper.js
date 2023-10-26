const dummy = () => 1

const totalLikes = (blogs) => blogs.reduce((sum, obj) => sum + obj.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  if (blogs.length === 1) {
    const blog = blogs[0]
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    }
  }

  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const favoriteBlogs = blogs.filter(blog => blog.likes === maxLikes)

  const mostLiked = favoriteBlogs[0]

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
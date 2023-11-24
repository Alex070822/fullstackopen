const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 7,
  }
]

const newBlog = {
  title: 'Test blog',
  author: 'Alexis Gonzalez',
  url: 'https://www.google.com/',
  likes: 7,
}

const newBlogWithoutLikes = {
  title: 'Nobody likes me :(',
  author: 'Alexis Gonzalez',
  url: 'https://www.google.com/',
}

const newBlogMissingProps = {
  author: 'Alexis Gonzalez',
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, newBlog, newBlogWithoutLikes, newBlogMissingProps, blogsInDb
}
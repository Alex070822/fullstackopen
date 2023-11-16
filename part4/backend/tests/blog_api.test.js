const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
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

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('HTTP GET request to the /api/blogs URL', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = response.body
  expect(blogs).toHaveLength(initialBlogs.length)
  console.log(blogs)
})

test('Blog posts have "id" as the unique identifier', async () => {
  const response = await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const blogs = response.body
  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})



afterAll(async () => {
  await mongoose.connection.close()
})
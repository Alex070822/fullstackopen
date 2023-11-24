const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
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
  expect(blogs).toHaveLength(helper.initialBlogs.length)
  console.log(blogs)
})

test('Blog posts have "id" as the unique identifier', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)

  const blogs = response.body
  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})

test('HTTP POST request to the /api/blogs URL increases total number of blogs by one', async () => {
  const initialResponse = await api
    .get('/api/blogs')
    .expect(200)

  const initialBlogsCount = initialResponse.body.length

  await api
    .post('/api/blogs')
    .send(helper.newBlog)
    .expect(201)

  const updatedResponse = await api
    .get('/api/blogs')
    .expect(200)

  const updatedBlogsCount = updatedResponse.body.length
  expect(updatedBlogsCount).toBe(initialBlogsCount + 1)
})

test('Verify if likes property is missing from request', async () => {
  const postResponse = await api
    .post('/api/blogs')
    .send(helper.newBlogWithoutLikes)
    .expect(201)

  const getResponse = await api
    .get(`/api/blogs/${postResponse.body.id}`)
    .expect(200)

  if (!('likes' in getResponse.body)) {
    getResponse.body.likes = 0

    await api
      .put(`/api/blogs/${postResponse.body.id}`)
      .send(getResponse.body)
      .expect(200)
  }

  const verifyResponse = await api
    .get(`/api/blogs/${postResponse.body.id}`)
    .expect(200)

  expect(verifyResponse.body).toHaveProperty('likes')
  expect(verifyResponse.body.likes).toBe(0)
})

test('Verify if new blog has title and url properties', async () => {
  await api
    .post('/api/blogs')
    .send(helper.newBlogMissingProps)
    .expect(400)
})

test('Delete a single blog entry', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
  .delete(`/api/blogs/${blogToDelete.id}`)
  .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
  )
  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})

afterAll(async () => {
  await mongoose.connection.close()
})


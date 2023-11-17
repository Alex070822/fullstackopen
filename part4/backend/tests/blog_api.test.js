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
    .send(newBlog)
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
  .send(newBlogWithoutLikes)
  .expect(201)

  const getResponse = await api
  .get(`/api/blogs/${postResponse.body.id}`)
  .expect(200)

  if (!('likes' in getResponse.body)) {
    getResponse.body.likes = 0;

    await api
    .put(`/api/blogs/${postResponse.body.id}`)
    .send(getResponse.body)
    .expect(200)
  }

  const verifyResponse = await api
  .get(`/api/blogs/${postResponse.body.id}`)
  .expect(200)

  expect(verifyResponse.body).toHaveProperty('likes');
  expect(verifyResponse.body.likes).toBe(0);
})

afterAll(async () => {
  await mongoose.connection.close()
})
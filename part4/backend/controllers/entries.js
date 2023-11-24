const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async(request, response) => {
  const requestKeys = Object.keys(request.body)
  const blogKeys = Object.keys(Blog.schema.paths)

  const keysMatch = requestKeys.length === blogKeys.length && requestKeys.every(key => blogKeys.includes(key))

  if (!keysMatch) {
    response.status(400).json({ error: 'Entry is missing properties' })
  } else {
    Blog.create(request.body)
      .then(result => {
        response.status(201).json(result)
      })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id);

  if (result) {
    response.status(204).end();
  } else {
    response.status(404).end();
  }
})

module.exports = blogsRouter
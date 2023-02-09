const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.post('/', (request, response) => {
    const body = request.body
    if (body.title === undefined) {
      return response.status(400).json({ error:'content missing' })
    }
    const blog = new Blog({
      title:body.title,
      author:body.author,
      url:body.url,
      likes:body.likes
      })
      blog.save().then(savedBlog => {
        response.json(savedBlog)
      })
      
  })

  blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
  
      })
  })

  module.exports = blogsRouter
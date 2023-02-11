const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id' , async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  try{
    if(blog){
      response.json(blog)
    }else {
      response.status(404).end()
    }
  } catch(error){
    error => middleware.next(error)
  }
    
})

blogsRouter.post('/', async (request, response) => {
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
  try{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }catch(error){
    error => middleware.next(error)
  }
})

blogsRouter.delete('/:id',async (request,response) => {
  try{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }catch(error){
    error => middleware.next(error)
  }
})

blogsRouter.put('/:id',async (request,response) => {
  const body = request.body
  const blog = {
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes | 0
  }
  const updated =  await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    {new:true,runValidators:true,context:'query'}
  )
  if(updated){
    return response.status(200).json(updated)
  } else {
    response.status(404).end()
  }
  
})





module.exports = blogsRouter
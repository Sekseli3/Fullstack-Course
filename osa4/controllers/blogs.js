const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{username:1,name:1,id:1})
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
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (body.title === undefined) {
    return response.status(400).json({ error:'content missing' })
  }
  const blog = new Blog({
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes,
    user: user._id
  })
  try{
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
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



/*
"username":"Niilo",
   "password":"salainen"
*/
module.exports = blogsRouter
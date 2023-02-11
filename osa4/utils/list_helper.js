var _ = require('lodash')
const dummy = (blogs) => {
  if(blogs.length === 0)return 1
  else return 1
}
const Likes = (blogs) => {
  const initialValue = 0
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  },
  initialValue)
}

const favoriteBlog = (blogs) => {
  var favorite = blogs[0]
  blogs.map(blog =>{
    if(blog.likes > favorite.likes) favorite = blog
  })
  return(favorite
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const count = _.countBy(blogs, 'author')
  const topAuthor = Object.keys(count).reduce((New, Old) => {
    if(count[New] > count[Old]) return New
    else return Old
  })
  
  return {
    author: topAuthor,
    blogs: count[topAuthor],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const count = _(blogs)
    .groupBy('author')
    .map((author,key) => ({
      author:key,
      likes: _.sumBy(author,'likes')
    }))
    .value()
  return count.reduce((New, Old) => {
    if(New.likes > Old.likes) return New
    else return Old
  })

}
    

 


module.exports =  {
  dummy,
  Likes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
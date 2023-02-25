import Togglable from "./Togglable"

const Blog = ({blog,blogUpdate,deleteBlog}) => {

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    console.log(blog.id)
    console.log(updatedBlog)
    blogUpdate(blog.id, updatedBlog)
  }
  const handleDelete = () => {
    window.confirm(`Are you sure you want to delete ${blog.title} ?`)
    deleteBlog(blog.id)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
  <div style = {blogStyle}>
    {blog.title} {blog.author}
    <Togglable buttonLabelOpen = 'view'
    buttonLabelClose = 'hide'>
      {blog.url}
      <div>
      {blog.likes}
      <button onClick={handleLike}>like</button>
      </div>
      {blog.user.name}
      <div>
        <button onClick={handleDelete}>remove</button>
      </div>
    </Togglable>
  </div>  
  )
}

export default Blog
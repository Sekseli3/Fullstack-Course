import { useState } from 'react'

const BlogForm = ({createBlog}) => {


  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
        title:
      <input
      id='title'
      className="titleContent"
        type = "text"
        value={newTitle}
        onChange={handleTitleChange}
      />
      </div>
      <div>
        author:
       <input
       id='author'
       className="authorContent"
        type = "text"
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      </div>
      <div>
      url:
       <input
       id='url'
       className="urlContent"
        type = "text"
        value={newUrl}
        onChange={handleUrlChange}
      />
       </div>
      <button type="submit">create</button>
    </form>  
  )
  
}
  export default BlogForm
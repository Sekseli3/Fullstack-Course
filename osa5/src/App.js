import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    blogService
      .getAll().then(initialNotes => {
        setBlogs(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    document.location.reload()
  }
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
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url : newUrl
    }
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    if (
      blogObject.title !== '' &&
      blogObject.author !== '' &&
      blogObject.url !== ''
    ) {
      
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
    } else {
      setErrorMessage( 'You must fill all fields in order to add a blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  
    const blogUpdate = async (Id, blogObject) => {
      try {
        await blogService.update(Id, blogObject)
        const updatedBlog = { ...blogObject, Id }
  
        setErrorMessage( 'Like added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  
        setBlogs(
          blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        )
      } catch (exception) {
        setErrorMessage( 'error occured')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    const deleteBlog = async (id) => {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
        setErrorMessage( 'removed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      } catch(exception){
        setErrorMessage( 'removing failed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />

    {!user && <LoginForm 
    username = {username}
    password = {password}
    handleUserNameChange= {({ target }) => setUsername(target.value)} 
    handlePasswordChange = {({ target }) => setPassword(target.value)}
    handleSubmit = {handleLogin}
    />
}
    {user && <div>
      
       <div>{user.name} logged in
       <button onClick={handleLogout}>Logout</button>        
         </div>
         <h3>Create new</h3>
         {<Togglable buttonLabelOpen ='Create new Blog'
         buttonLabelClose = 'Close'>
         <BlogForm
        handleSubmit ={addBlog}
        title = {newTitle}
        handleTitleChange = {handleTitleChange}
        author = {newAuthor}
        handleAuthorChange = {handleAuthorChange}
        url = {newUrl}
        handleUrlChange = {handleUrlChange}
        />
        </Togglable>
         }
         {blogs
         .filter((blogs) => blogs.user.username === user.username)
         .sort((first,second) => first.likes - second.likes)
         .map(blog =>
        <Blog key={blog.id} blog={blog} blogUpdate = {blogUpdate} deleteBlog = {deleteBlog}/>
      )}
      </div>
    }
    </div>
  )
}

export default App
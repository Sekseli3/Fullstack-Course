
const BlogForm = (props) => (
    <form onSubmit={props.handleSubmit}>
      <div>
        title:
      <input
        type = "text"
        value={props.title}
        onChange={props.handleTitleChange}
      />
      </div>
      <div>
        author:
       <input
        type = "text"
        value={props.author}
        onChange={props.handleAuthorChange}
      />
      </div>
      <div>
      url:
       <input
        type = "text"
        value={props.url}
        onChange={props.handleUrlChange}
      />
       </div>
      <button type="submit">create</button>
    </form>  
  )
  export default BlogForm
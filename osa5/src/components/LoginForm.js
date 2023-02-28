
const LoginForm = (props) => {
    return(
    <form onSubmit={props.handleSubmit}>
      <div>
        username
          <input
           id='username'
          type="text"
          value={props.username}
          name="Username"
          onChange={props.handleUserNameChange}
        />
      </div>
      <div>
        password
          <input
           id='password'
          type="password"
          value={props.password}
          name="Password"
          onChange={props.handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>    
    )  
}

  export default LoginForm
import Button from "./Button"

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <>
      <h1>Log in to Application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}  
          />
        </div>
        <Button type='submit' text='Login' />
      </form>
    </>
  )
}

export default LoginForm
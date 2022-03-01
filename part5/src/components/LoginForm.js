import { useState } from "react"
import Button from "./Button"

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleLogin = event => {
    event.preventDefault()
    
    login({
      username, password
    })

    setUsername('')
    setPassword('')
  }

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
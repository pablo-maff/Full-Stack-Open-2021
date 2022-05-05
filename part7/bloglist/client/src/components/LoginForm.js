import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeLoggedInUser } from '../reducers/loggedUserReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    const user = {
      username,
      password,
    }
    dispatch(initializeLoggedInUser(user))
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            onChange={handleUsernameChange}
            id="username"
          />
        </div>
        <div>
          <TextField
            label="password"
            onChange={handlePasswordChange}
            type="password"
            id="password"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          id="login-button"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm

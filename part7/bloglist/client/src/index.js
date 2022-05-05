import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Container } from '@mui/material'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Container>
        <App />
      </Container>
    </Provider>
  </Router>,
  document.getElementById('root')
)

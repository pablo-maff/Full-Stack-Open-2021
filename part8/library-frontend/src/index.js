import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

// Creates a client object which is used to send a query to the server
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
})

ReactDOM.render(
  // Make the client accesible to all components
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

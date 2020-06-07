import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './Component/App';
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {Router} from 'react-router-dom'
import History from './History' 
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("AUTH_TOKEN")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Router history={History}>
    <App />
    </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

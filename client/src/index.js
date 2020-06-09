import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './Component/App';
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {split} from 'apollo-link'
import {WebSocketLink} from 'apollo-link-ws'
import {getMainDefinition} from 'apollo-utilities'
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
const wsLink= new WebSocketLink({
  uri: 'ws://localhost:4000',
  options:{
    reconnect:true,
    connectionParams:{
      authToken:localStorage.getItem("AUTH_TOKEN")
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})
const link=split(
  ({query})=>{
    const {kind ,operation}=getMainDefinition(query)
    return kind==='OperationDefinition' && operation==='subscription'
  },wsLink,authLink.concat(httpLink)
)
const client = new ApolloClient({
  link: link,
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

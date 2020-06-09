import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'
const SEARCH_QUERY=gql`
query FeedSearchQuery($filter:String!){
    feed(filter:$filter){
        links{
            id 
            url
            description
            postedBy{
                id 
                name
            }
            votes{
                id
                user{
                    id
                }
            }
        }
    }
}
`

class Search extends Component {

  state = {
    links: [],
    filter: ''
  }

  render() {
    return (
      <div>
        <div>
          Search
          <input
            type='text'
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <button onClick={() => this._executeSearch()}>OK</button>
        </div>
        {this.state.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </div>
    )
  }

  _executeSearch = async () => {
    // ... you'll implement this 🔜
    let {filter}=this.state
    let result=await this.props.client.query({
        query:SEARCH_QUERY,
        variables:{ filter },
    })
    this.setState({links:result.data.feed.links})
  }
}

export default withApollo(Search)
import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import Link1 from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
const FEED_QUERY=gql`{
    feed{
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
}`
const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`
class LinkList extends Component {
    subscribeToNewLinks=async(subscribeToMore)=>{
        console.log('hello')
        subscribeToMore({
            document:NEW_LINKS_SUBSCRIPTION,
            updateQuery:(prev,{subscriptionData})=>{
                console.log(prev)
                console.log(subscriptionData)
            }
        })
    }
  render() {
    return (
        <Query query={FEED_QUERY}>
            {
                ({loading,error,data,subscribeToMore})=>{
                    
                    if(loading) return<div>Fetching</div>
                    if(error) {
                        console.log(error)
                    }
                    this.subscribeToNewLinks(subscribeToMore)
                    const linksToRenders=data.feed.links
                    return (
                        <div>
                          {linksToRenders.map((link,index) => <Link1 key={link.id} link={link} index={index} />)}
                          {/* <Link to='/create'>Create New</Link> */}
                        </div>
                      )
                }
            }
        </Query>

    )
  }
}

export default LinkList
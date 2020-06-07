import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const POST_MUTATION=gql`
mutation AnyMutation($description:String!,$url:String!){
  post(description:$description,url:$url){
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
`
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


class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  }

  render() {
    const { description, url } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation mutation={POST_MUTATION} variables={{description,url}}
          update={(store,{data:{post}})=>{
            const data=store.readQuery({query:FEED_QUERY})
            // console.log(data)
            data.feed.links.unshift(post)
            store.writeQuery({query:FEED_QUERY,data})
          }}
        onCompleted={() => this.props.history.push('/')}>
          {(postMutation)=>(
        <button onClick={postMutation}>Submit</button>
          )}
        </Mutation>
      </div>
    )
  }
}

export default CreateLink
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import History from '../History'
// import { withRouter } from 'react-router'
class Header extends Component {
  state={tok:false}
  componentDidMount(){
    const authToken = localStorage.AUTH_TOKEN
    if(authToken){
      this.setState({tok:true})
    }
  }
  render() {
    console.log(this.state.tok)
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">Hacker News</div>
          <Link to="/create" className="ml1 no-underline black">
            new
          </Link>
          <div className="ml1">|</div>
        <Link to="/search" className="ml1 no-underline black">
          search
        </Link>
          {this.state.tok && (
            <div className="flex">
              <div className="ml1">|</div>
              <Link to="/create" className="ml1 no-underline black">
                submit
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-fixed">
          {this.state.tok ? (
            <div
              className="ml1 pointer black"
              onClick={() => {
                History.push('/')
                localStorage.removeItem("AUTH_TOKEN")
              }}
            >
              logout
            </div>
          ) : (
            <Link to="/login" className="ml1 no-underline black">
              login
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default Header
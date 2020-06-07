import React from 'react'
import LinkList from './LinkLis'
import {Route} from 'react-router-dom'
import CreateLink from './CreateLink'
import Header from './Header'
import Login from './Login'

class App extends React.Component{
    render()
    {
        return<div className="center w85">
            <Header/>
            <div className='ph3 pv1 background-gray'>
            <Route path='/' exact component={LinkList}/>
            <Route path='/create' exact component={CreateLink}/>
            <Route path='/login' exact component={Login}/>
            </div>
        </div>
    }
}
export default App
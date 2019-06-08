import React, { Component } from 'react';
import {HashRouter, Route, Link} from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';
import Users from './Users';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <HashRouter>
                <h1>Acme Users</h1>
                <Nav />
                
                <Route exact path='/' component={Home}/>
                <Route exact path='/users/:idx?' component={Users}/>
                <Route path='/users/search/:searchText/:idx' component={Users}/>
            </HashRouter>
         );
    }
}
 
export default App;
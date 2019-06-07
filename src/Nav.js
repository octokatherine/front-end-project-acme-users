import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => {
    return ( 
        <ul style={{display: 'flex', listStyle: 'none'}}>
            <li style={{marginRight: '10px'}}>
                <NavLink exact activeClassName='is-active' to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink exact activeClassName='is-active' to='/users'>Users</NavLink>
            </li>
        </ul>
     );
}
 
export default Nav;
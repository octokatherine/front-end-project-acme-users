import React from 'react';
import {NavLink} from 'react-router-dom';

const Pager = ({ links }) => {
    return ( 
        <div>
              <ul style={{display: 'flex', listStyle: 'none'}}>
                 {
                    links.map((link)=>
                        (
                        ( !link.searchText ? 
                        <li key={link.idx}><NavLink activeClassName='is-active' to={`/users/${(link.idx)}`}>{link.text}</NavLink></li>
                         :
                         <li key={link.idx}><NavLink activeClassName='is-active' to={`/users/search/${link.searchText}/${(link.idx)}`}>{link.text}</NavLink></li>
                        )
                    )
                    
                        )  
                 }
              </ul>
        </div>
     );
}
 
export default Pager;


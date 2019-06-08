import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchText: ''
         }
         this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev) {
        this.setState({searchText: ev.target.value});
    }


    render() { 
        const { searchText } = this.state;
        const { handleChange } = this;
        const { idx, handleSubmit } = this.props;
        
        return ( 
            <form onSubmit={(e)=>{handleSubmit(e, searchText, idx)}}>
                <input type='text' value={searchText} onChange={handleChange}></input>
                <button type='submit'>Search</button>
            </form>
         );
    }
}
 
export default Search;
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchText: '',
            searchidx: 0
         }
         this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev) {
        this.setState({searchText: ev.target.value});
    }


    render() { 
        const { searchText, searchidx } = this.state;
        const { handleChange } = this;
        return ( 
            <form onSubmit={(e)=>{this.props.handleSubmit(e, searchText, searchidx)}}>
                <input type='text' value={searchText} onChange={handleChange}></input>
                <button type='submit'>Search</button>
            </form>
         );
    }
}
 
export default Search;
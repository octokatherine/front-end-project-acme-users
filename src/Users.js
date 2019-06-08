import React, { Component } from 'react';
import axios from 'axios';
import Pager from './Pager';
import Search from './Search';


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            numberOfPages: 0,
            countPerPage: 50,
            totalCount: 0,
            data: [],
            links: [],
            searchText: ''
         }
         this.handleSubmit = this.handleSubmit.bind(this);
         this.updateSearchText = this.updateSearchText.bind(this);
    }

    async componentDidMount() {
        try {
            const idx = this.props.match.params.idx || 0;
            const response = await axios.get(`https://acme-users-api-rev.herokuapp.com/api/users/${idx}`);
            this.setState({ data: response.data, totalCount: response.data.count, numberOfPages: Math.ceil(response.data.count/this.state.countPerPage) });
            const links = [];
            for (let i = 0; i < this.state.numberOfPages; i++) {
                links.push({
                    idx: i,
                    text: i + 1
                })
            }
            this.setState({links})
          }
          catch (error) {
            console.log(error);
          }
        }

    async componentDidUpdate(prevProps) {
        if (prevProps.match.params.searchidx === undefined) {
        if (prevProps.match.params.idx !== this.props.match.params.idx){
        try {
            const idx = this.props.match.params.idx || 0;
            const response = await axios.get(`https://acme-users-api-rev.herokuapp.com/api/users/${idx}`);
            this.setState({ data: response.data, totalCount: response.data.count, numberOfPages: Math.ceil(response.data.count/this.state.countPerPage) });
            const links = [];
            for (let i = 0; i < this.state.numberOfPages; i++) {
                links.push({
                    idx: i,
                    text: i
                })
            }
            this.setState({links})
          }
          catch (error) {
            console.log(error);
          }
        }}
        else {
            if (prevProps.match.params.searchidx !== this.props.match.params.searchidx){
                try {
                    const searchidx = this.props.match.params.searchidx || 0;
                    const searchText = this.state.searchText;
                    const response = await axios.get(`https://acme-users-api-rev.herokuapp.com/api/users/search/${searchText}/${searchidx}`);
                    this.setState({ data: response.data, totalCount: response.data.count, numberOfPages: Math.ceil(response.data.count/this.state.countPerPage) });
                    const links = [];
                    for (let i = 0; i < this.state.numberOfPages; i++) {
                        links.push({
                            searchidx: i,
                            text: i,
                            searchText: searchText
                        })
                    }
                    this.setState({links})
                  }
                  catch (error) {
                    console.log(error);
                  }
            }
        }
    }

    async handleSubmit(e, searchText, searchidx) {
        e.preventDefault();
        this.props.history.push(`/users/search/${searchText}/${(searchidx)}`)
        try {
            const idx = searchidx || 0;
            const response = await axios.get(`https://acme-users-api-rev.herokuapp.com/api/users/search/${searchText}/${idx}`);
            this.setState({ data: response.data, totalCount: response.data.count, numberOfPages: Math.ceil(response.data.count/this.state.countPerPage) });
            const links = [];
            for (let i = 0; i < this.state.numberOfPages; i++) {
                links.push({
                    searchidx: i,
                    text: i + 1,
                    searchText: searchText
                })
            }
            this.setState({links})
          }
          catch (error) {
            console.log(error);
          }
    }

    updateSearchText(text) {
        this.setState(
            {searchText: text}
        )
    }
    
    render() { 
        const { data, links, totalCount, numberOfPages } = this.state;
        const { handleSubmit, updateSearchText } = this;
        return ( 
            <div>
                <p>{totalCount} results. Page {this.props.match.params.idx || this.props.match.params.searchidx} of {numberOfPages} </p>
                <Search handleSubmit={handleSubmit} updateSearchText={updateSearchText}/>
                <Pager links={links}/>
                <table>
                    <tbody>
                        <tr style={{fontWeight: 'bold'}}><td>First Name</td><td>Last Name</td><td>Middle Name</td><td>Email</td><td>Title</td></tr>
                        {
                            (data.users !== undefined ? 
                                data.users.map((user)=>
                                    <tr key={user.id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.middleName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.title}</td>
                                    </tr>
                            )
                            : null)
                        }
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default Users;
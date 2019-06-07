import React, { Component } from 'react';
import axios from 'axios';
import Pager from './Pager';


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            numberOfPages: 0,
            countPerPage: 50,
            totalCount: 0,
            data: [],
            links: []
         }
    }

    async componentDidMount() {
        try {
            const idx = this.props.match.params.idx || 0;
            console.log(idx);
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
        if (prevProps.match.params.idx !== this.props.match.params.idx){
        try {
            const idx = this.props.match.params.idx || 0;
            console.log(idx);
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
    }
    
    render() { 
        // console.log(this.state.data)
        // console.log(this.state.totalCount)
        // console.log(this.state.numberOfPages)
        // console.log(this.state.links)
        const { data, links } = this.state;
        return ( 
            <div>
            <Pager links={links}/>
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
            </div>
         );
    }
}
 
export default Users;
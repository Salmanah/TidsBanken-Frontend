import React, { Component } from 'react';
import ApplicationFrame from '../../components/application-frame/index';
import CreateUser from '../../components/create-user/index';
import {Button} from 'react-bootstrap';
import './users.css';

class Users extends Component{



    render(){
        return(
            <div>
                <ApplicationFrame/>
                <div className="usersContent">
                    <h1> User settings </h1>
                    <CreateUser /> <br/>
                    <Button> Update user </Button>
                </div>
            </div>
            
        )
    }
}

export default Users;
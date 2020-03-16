import React, { Component } from 'react';
import ApplicationFrame from '../../components/application-frame/index';
import CreateUser from '../../components/create-user/index';
import {Button} from 'react-bootstrap';
import './users.css';
import ToggleBox from '../../components/toggle-box/index';
import ViewAllUsers from '../../components/view-all-users/index';

class Users extends Component{

    



    render(){
        return(
            <div>
                <ApplicationFrame/>
                <div className="usersContent">
                    <h1> User settings </h1>
                    <CreateUser /> <br/>
                    <Button> Update user </Button>
                    <br/> <br/>
                    <ToggleBox title="all users">
				        <ViewAllUsers />
			        </ToggleBox>
                </div>
            </div>
        )
    }
}

export default Users;
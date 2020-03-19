import React, { useEffect } from 'react';
import CreateUser from '../../components/create-user/index';
import { Button } from 'react-bootstrap';
import './users.css';
import ToggleBox from '../../components/toggle-box/index';
import ViewAllUsers from '../../components/view-all-users/index';
import { getAllUsers } from '../../utils/APIUtils';
import {List} from '@material-ui/core';
import UserListItem from '../../components/user-list-item/index';

const Users = (props) => {

    const [users, setUsers] = React.useState([])

    useEffect(()=>{
        getAllUsers().then(response=>{
            setUsers(response);
        })
    }, [])



    if (props.currentUser.admin){
        return (
        <div>
            <div className="usersContent">
                <h1> User settings </h1>
                <CreateUser /> <br />
                <Button> Update user </Button>
                <br /> <br />
                <ToggleBox title="all users">
                <List>
                    {users.map((element, index) => {
                        if (!element.admin){
                            return <UserListItem key={index} user={element} parentProps={props} />
                        }
                    })}
                </List>
                </ToggleBox>
            </div>
        </div>
    )
    } else {
        return(
            <div>
                Not authorized as admin, access not given
            </div>
        )
    }

    
}

export default Users;
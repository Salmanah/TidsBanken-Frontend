import React from 'react';
import CreateUser from '../../components/create-user/index';
import { Button } from 'react-bootstrap';
import './users.css';
import ToggleBox from '../../components/toggle-box/index';
import ViewAllUsers from '../../components/view-all-users/index';

const Users = () => {

    return (
        <div>
            <div className="usersContent">
                <h1> User settings </h1>
                <CreateUser /> <br />
                <Button> Update user </Button>
                <br /> <br />
                <ToggleBox title="all users">
                    <ViewAllUsers />
                </ToggleBox>
            </div>
        </div>
    )
}

export default Users;
import React from 'react';
import UserListItem from '../../components/user-list-item/index';
import { List } from '@material-ui/core';

const ViewAllUsers = () => {

    return (
        <div>
            <h4>(Searchable?) list of all users</h4>
            <List>
                <UserListItem />
            </List>
        </div>
    )
}

export default ViewAllUsers;

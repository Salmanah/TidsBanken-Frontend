import React, { Component } from 'react';
import UserListItem from '../../components/user-list-item/index';
import { List, ListItem, Checkbox, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

class ViewAllUsers extends Component{




    render(){

        return(


            <div>
                <h4>(Searchable?) list of all users</h4>
                <List>
                    <UserListItem />
                </List>
            </div>
        )
    }
}

export default ViewAllUsers;
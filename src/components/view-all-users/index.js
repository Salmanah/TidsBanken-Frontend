import React, { Component } from 'react';
import UserListItem from '../../components/user-list-item/index';
import { List, TextField, IconButton } from '@material-ui/core';

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
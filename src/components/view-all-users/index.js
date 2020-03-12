import React, { Component } from 'react';
import {List, ListItem} from '@material-ui/core';

class ViewAllUsers extends Component{

    render(){
        return(
            <div>
                <h4>(Searchable?) list of all users</h4>
                <List>
                    <ListItem> User 1 </ListItem>
                    <ListItem> User 2 </ListItem>
                </List>
            </div>
        )
    }
}

export default ViewAllUsers;
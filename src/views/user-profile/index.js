import React, { Component } from "react";
import ApplicationFrame from '../../components/application-frame/index';
import EditIcon from '@material-ui/icons/Edit';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import {Button} from 'react-bootstrap';
import {List, ListItem, ListItemIcon, ListItemText, IconButton} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';

class UserProfile extends Component{

    constructor(props){
        super(props)
        this.state = {
            name : "No name",
            email : "No email",
            profilePic : "No picture",
            isAdmin : false
        }
    }

    editClick(event){
        console.log("edit pushed");
    }

    render() {
        return(
            <div>
                <h1>User profile</h1>
                <List>
                    <ListItem>
                        <ListItemIcon><PersonIcon/></ListItemIcon>
                        <ListItemText>{this.props.currentUser.name}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><MailIcon/></ListItemIcon>
                        <ListItemText>{this.props.currentUser.email}</ListItemText>
                        <IconButton edge="end" aria-label="edit"><EditIcon/></IconButton>
                    </ListItem>
                </List>
                <img src={this.props.currentUser.imageUrl} alt="No image"/><Button variant="outline-secondary" size="sm" onClick={e => this.editClick(e)}><EditIcon /></Button>
            </div>
        ) 
    }
}

export default UserProfile;

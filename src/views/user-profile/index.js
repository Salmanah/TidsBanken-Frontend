import React, { Component } from "react";
import ApplicationFrame from '../../components/application-frame/index';
import EditIcon from '@material-ui/icons/Edit';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import {Button} from 'react-bootstrap';
import {List, ListItem, ListItemIcon, ListItemText, IconButton, TextField} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import { getCurrentUser } from "../../utils/APIUtils";
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

class UserProfile extends Component {

    constructor(props){
        super(props)
        this.state = {
            name : "No name",
            email : "No email",
            profilePic : "No picture",
            isAdmin : false,
            editEmail : false,
        }
    }

    editClick(event){
        console.log("edit email pushed");
        //perform update of email
        this.setState({
            editEmail : true
        })
    }

    emailInputChange(event){
        console.log(event.target.value);
    }

    //Brukes ikke per nå
    componentDidMount(){
        getCurrentUser().then(response => {
            console.log(response)
            this.setState({
                name : response.name,
                email : response.email,
                profilePic : response.imageUrl,
                isAdmin : response.admin
            })
        })
    }

    handleCancelEdit(event){
        this.setState({
            editEmail : false
        })
    }

    render() {

        console.log("editemail: " + this.state.editEmail)

        return(
            <div>
                <h1>User profile</h1>
                <List>
                    <ListItem>
                        <ListItemIcon><PersonIcon/></ListItemIcon>
                        <ListItemText>{this.props.currentUser.name}</ListItemText>
                    </ListItem>
                    {this.state.editEmail ? (
                        <div>
                            <ListItem>
                                <ListItemIcon><MailIcon/></ListItemIcon>
                                <TextField placeholder="Enter email here" onChange={e => this.emailInputChange(e)}></TextField>
                                <IconButton edge="end" aria-label="cancel" onClick={e => this.handleCancelEdit(e)}><CloseIcon/></IconButton>
                                <IconButton edge="end" aria-label="approve"><CheckIcon/></IconButton>
                            </ListItem>
                        </div>
                    ) : (
                        <div>
                            <ListItem>
                                <ListItemIcon><MailIcon/></ListItemIcon>
                                <ListItemText>{this.props.currentUser.email}</ListItemText>
                                <IconButton edge="end" aria-label="edit" onClick={e => this.editClick(e)}><EditIcon/></IconButton>
                            </ListItem>
                        </div>
                    )}
                </List>
                <img src={this.props.currentUser.imageUrl} alt="No image"/><Button variant="outline-secondary" size="sm" onClick={e => this.editClick(e)}><EditIcon /></Button>
            </div>
        ) 
    }
}

export default UserProfile;
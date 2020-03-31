import React, {useState, useEffect} from 'react';
import { Collapse, ListItem, Button, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {editUser} from '../../utils/APIUtils';
import './userListItem.css';


//Displays information about specific user given in the props. Contains toggle button for admin to verify/un-verify users.
//When the "reveal more" icon button button is pushed, details about the user is revealed together with buttons for 
//viewing user profile, viewing request and to make this user admin. If the user is already admin, the admin can make this other
//admin not admin (does not have access to make own rights not include admin)
const UserListItem = (props) => {

    const [currentUserId, setCurrentUserId] = useState(props.parentProps.currentUser.id);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(props.user); //other user in system
    const [verified, setVerified] = useState(user.emailVerified);
    const [admin, setAdmin] = useState(user.admin);

    function handleViewProfile(){
        props.parentProps.history.push({
            pathname : "/UserProfile",
            userId : user.id,
        })
    }
 
    function handleViewRequest(){
        props.parentProps.history.push({
            pathname : "/VacationRequestHistory",
            state : {
                user : props.user
            }
        })
    }

    function handleVerifyUser(){
        editUser(user.id, user.name, user.admin, true)
        .then(resp => {
            setVerified(true)
        }).catch(err => console.error(err));
    }

    function handleUnVerifyUser(){
        editUser(user.id, user.name, user.admin, false)
        .then(resp => {
            setVerified(false)
        }).catch(err => console.error(err));
    }

    function handleMakeUser(){
        editUser(user.id, user.name, false, user.emailVerified)
        .then(resp => {
            setAdmin(false)
            console.log(resp)
        }).catch(err => console.error(err));
    }

    function handleMakeAdmin(){
        editUser(user.id, user.name, true, user.emailVerified)
        .then(resp => {
            console.log(resp)
            setAdmin(true)
        }).catch(err => console.error(err));
    }

    
    return (
        <div>
            <ListItem >
                {verified ? 
                <IconButton onClick={handleUnVerifyUser}><CheckCircleIcon className="checkedIcon"/></IconButton> 
                : <IconButton onClick={handleVerifyUser}><CheckCircleOutlineIcon/></IconButton>}
                {admin ? 
                <><ListItemText>{user.name} <div className="role">Admin</div> </ListItemText></>
                : <ListItemText>{user.name} <div className="role">User</div> </ListItemText>}
                {open ? 
                <IconButton onClick={e => {setOpen(false)}}><ExpandLess/></IconButton> 
                : <IconButton onClick={e=>{setOpen(true)}}><ExpandMore/></IconButton>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <ListItem className="itemContent">
                    <ListItemText>ID : {props.user.id}</ListItemText>
                </ListItem>
                <ListItem className="itemContent">
                    <ListItemText>E-mail: {props.user.email}</ListItemText>
                </ListItem>
                {(verified && !(user.id === currentUserId)) ? 
                <ListItem className="itemContent">
                        <ListItemText>
                            <Button onClick={handleViewProfile}>View profile</Button>
                            <Button onClick={handleViewRequest}>View requests</Button>
                            {admin ? 
                            <Button color="secondary" onClick={handleMakeUser}>Make user</Button>
                            : <Button color="secondary" onClick={handleMakeAdmin}>Make admin</Button>}
                        </ListItemText>
                 </ListItem>
                 : <></>}
            </Collapse>
        </div>
    )
}


export default UserListItem;
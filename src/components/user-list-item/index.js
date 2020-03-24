import React, {useState, useEffect} from 'react';
import { Collapse, ListItem, Button, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {editUser, getCurrentUser} from '../../utils/APIUtils';


const UserListItem = (props) => {


    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(props.user)



    function viewRequestsClick(){
        props.parentProps.history.push({
            pathname : "/VacationRequestHistory",
            state : {
                user : props.user
            }
        })
    }

    const [verified, setVerified] = useState(user.emailVerified);
    const [gotResponse, setGotResponse] = useState(false);

    function handleVerifyUser(){
        console.log("verify click")
        editUser(user.id, user.name, user.admin, true)
        .then(resp => {
            console.log("edit user resp:")
            console.log(resp)
            setVerified(true)
        }).catch(err => console.error(err));
    }

    function handleUnVerifyUser(){
        console.log("verify click")
        editUser(user.id, user.name, user.admin, false)
        .then(resp => {
            console.log("edit user resp:")
            console.log(resp)
            setVerified(false)
        }).catch(err => console.error(err));
    }

    
    return (
        <div>
                <ListItem >
                    {verified ? <IconButton onClick={handleUnVerifyUser}><CheckCircleIcon color="primary"/></IconButton> : 
                    <IconButton onClick={handleVerifyUser}><CheckCircleOutlineIcon/></IconButton>}
                    
                    <ListItemText>{props.user.name}</ListItemText>
                    {open? <IconButton onClick={e => {setOpen(false)}}><ExpandLess/></IconButton> : <IconButton onClick={e=>{setOpen(true)}}><ExpandMore/></IconButton>}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ListItem className="itemContent">
                        <ListItemText>ID : {props.user.id}</ListItemText>
                    </ListItem>
                    <ListItem className="itemContent">
                        <ListItemText>E-mail: {props.user.email}</ListItemText>
                    </ListItem>
                    <ListItem className="itemContent">
                            <ListItemText><Button onClick={viewRequestsClick}>View requests</Button><Button>Make admin</Button></ListItemText>
                            <ListItemText></ListItemText>                        
                    </ListItem>
                </Collapse>
            </div>
    )
}


/*class UserListItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: true,
            open : false
        }
    }

    handleMoreInfoClick(){
        this.setState({open : !this.state.open})
    }

    handleToggle(event) {
        this.setState({ checked: !this.state.checked })
    }

    handleEditClick(event) {
        console.log(event.target.value); //denne blir av og til undefined pga hvor man trykker på knappen
    }

    handleListItemClick(){
        console.log("user list item clicked")
    }

    render() {

        console.log("props i useritem:")
        console.log(this.props.user)

        return (
            <div>
                <ListItem button onClick={e => this.handleMoreInfoClick(e)}>
                    <ListItemText>{this.props.user.name}</ListItemText>
                    {this.state.open? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <ListItem>
                        <ListItemText>More info</ListItemText>
                    </ListItem>
                    <ListItem>

                    </ListItem>
                </Collapse>
            </div>
            
        )
    }
}*/

export default UserListItem;
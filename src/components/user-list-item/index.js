import React from 'react';
import { Collapse, ListItem, Button, ListItemText } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';


const UserListItem = (props) => {

    const [open, setOpen] = React.useState(false);

    function handleMoreInfoClick(){
        setOpen(!open);
    }


    function viewRequestsClick(){
        props.parentProps.history.push({
            pathname : "/VacationRequestHistory",
            state : {
                user : props.user
            }
        })
    }

    
    return (
        <div>
                <ListItem button onClick={handleMoreInfoClick}>
                    <ListItemText>{props.user.name}</ListItemText>
                    {open? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ListItem className="itemContent">
                        <ListItemText>ID : {props.user.id}</ListItemText>
                    </ListItem>
                    <ListItem className="itemContent">
                        <ListItemText>E-mail: {props.user.email}</ListItemText>
                    </ListItem>
                    <ListItem className="itemContent">
                        <ListItemText><Button onClick={viewRequestsClick}>View requests</Button></ListItemText>
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
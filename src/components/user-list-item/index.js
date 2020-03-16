import React, {Component} from 'react';
import { List, ListItem, Checkbox, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

class UserListItem extends Component{

    constructor(props){
        super(props)
        this.state={
            checked : true
        }
    }

    handleToggle(event){
        this.setState({checked : !this.state.checked})
    }

    handleEditClick(event){
        console.log(event.target.value); //denne blir av og til undefined pga hvor man trykker på knappen
    }

    render(){

        const listItemContent = "User 1"

        return(
            <ListItem> 
                <ListItemIcon>
                    <Checkbox
                    value={this.state.checked}
                    onChange={e => this.handleToggle(e)}
                    />
                </ListItemIcon>
                <ListItemText>{listItemContent}</ListItemText>
                <ListItemSecondaryAction>
                    <IconButton value={listItemContent} onClick={e => this.handleEditClick(e)}>
                        <EditIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

export default UserListItem;
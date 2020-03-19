import React, { Component } from 'react';
import { ListItem, Checkbox, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

class UserListItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: true
        }
    }

    handleToggle(event) {
        this.setState({ checked: !this.state.checked })
    }

    handleEditClick(event) {
        console.log(event.target.value); //denne blir av og til undefined pga hvor man trykker på knappen
    }

    render() {

        console.log("props i useritem:")
        console.log(this.props.user)

        const listItemContent = "User 1"

        return (
            <ListItem key={this.props.key}>
                <ListItemText>{this.props.user.name}</ListItemText>
            </ListItem>
        )
    }
}

export default UserListItem;
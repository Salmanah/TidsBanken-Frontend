import React, { Component, useEffect, useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
//import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { List, ListItem, ListItemIcon, ListItemText, IconButton, TextField } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import { getCurrentUser, getOtherUserAsAdmin } from "../../utils/APIUtils";
//import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const MyProfile = (props) => {

    const [user, setUser] = useState(props.currentUser);

    return(
        <Container>

            <Row>
                <Col sm={3.5}>
                    <img src={user.imageUrl} width="300" alt="Profile picture" />
                </Col>
                <Col>
                    <List>
                        <ListItem><ListItemText>Name: {user.name}</ListItemText></ListItem>
                        <ListItem><ListItemText>Email: {user.email}</ListItemText></ListItem>
                        {user.admin ? (
                            <ListItem><ListItemText>Admin</ListItemText></ListItem>
                        ) : (
                            <ListItem><ListItemText>User</ListItemText></ListItem>
                        )}
                        
                    </List>
                </Col>
            </Row>

        </Container>
    )
}

export default MyProfile;
import React, { useState } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import './myProfile.css';


const MyProfile = (props) => {

    const [user, setUser] = useState(props.currentUser);

    return(
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                <h1>My profile</h1>
                </Col>
            </Row>
            <Row >
                <Col md={{ span: 8, offset: 2 }}>
                    <div className="profileContent">
                    <Row>
                        <Col>
                            <img src={user.imageUrl} width="300" alt="Profile picture" />
                        </Col>
                        <Col>
                        <div className="listProfile">
                            <List>
                                <ListItem><ListItemIcon><PersonIcon/></ListItemIcon><ListItemText> Name: {user.name}</ListItemText></ListItem>
                                <ListItem><ListItemIcon><MailIcon/></ListItemIcon><ListItemText>Email: {user.email}</ListItemText></ListItem>
                                {user.admin ? (
                                    <ListItem><ListItemText><div className="profileRole">Admin</div></ListItemText></ListItem>
                                ) : null}
                                
                            </List>
                        </div>
                            
                        </Col>
                    </Row>
                    </div>
                </Col>
                
            </Row>

        </Container>
    )
}

export default MyProfile;
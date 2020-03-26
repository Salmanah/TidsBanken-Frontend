import React, {useEffect, useState} from 'react';
import { getNotificationForAdmin, getNotificationForCurrentUser, getCurrentUser } from "../../utils/APIUtils";
import {List, ListItem, ListItemText} from '@material-ui/core';
import {Container, Row, Col} from 'react-bootstrap';

const NotificationsView = (props) => {
    
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=>{
        getCurrentUser()
        .then(resp => {
            console.log(resp)
            setCurrentUser(resp);
        }).catch(err => {console.error(err)});
    }, [])

    const [nots, setNots] = useState([])

    useEffect(()=>{
        if (currentUser != null){
            if (currentUser.admin){
            getNotificationForAdmin()
            .then(resp=>{
                console.log(resp)
                setNots(resp)
            }).catch(err => {
                console.error(err)
                let list = [];
                list.push("No notifications yet");
                setNots(list);
            })
        }else{
            getNotificationForCurrentUser()
            .then(resp=>{
                console.log(resp)
                setNots(resp)
            }).catch(err => {
                console.error(err);
                let list = [];
                list.push("No notifications yet");
                setNots(list);
            })
        }
        }
        
    },[currentUser])

    function handleGoToRequest(notification){
        console.log("Go from nots to request")
        console.log(notification)


    }

 
    return(
        <Container>
            <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <h1>Notifications</h1>
            <List>
            {nots.slice(0).reverse().map((element, index) => {
                    if (element === "No notifications yet"){
                        return(<ListItem><ListItemText>{element}</ListItemText></ListItem>)
                    } else{
                        return(<ListItem button onClick={handleGoToRequest(element)}><ListItemText>{element.datetimestamp} {element.message}</ListItemText></ListItem>)
                    }
                })}
            </List>
            </Col>
            </Row>

            
        </Container>
    )
}

export default NotificationsView;
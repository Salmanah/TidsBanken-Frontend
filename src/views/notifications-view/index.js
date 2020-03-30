import React, {useEffect, useState} from 'react';
import { getNotificationForAdmin, getNotificationForCurrentUser, getCurrentUser, getVacationRequestByID, getVacationRequestByIDasAdmin } from "../../utils/APIUtils";
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Container, Row, Col, Spinner} from 'react-bootstrap';


//View that displays all comments registered in the database
//Admin gets notifications for created vacation request, comments added 
//Most notification logic is implemented by backend 
const NotificationsView = (props) => {
    
    const [currentUser, setCurrentUser] = useState(null);
    const [nots, setNots] = useState([]); //List of notifications
    const [vacationRequest, setVacationRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    //Gets information about the current user
    useEffect(()=>{
        getCurrentUser()
        .then(resp => {
            console.log(resp)
            setCurrentUser(resp);
        }).catch(err => {console.error(err)});
    }, [])

    //When currentUser have been assigned a value, this useEffect fetches a list of notifications relevant for this particular currentUser
    useEffect(()=>{
        if (currentUser != null){
            if (currentUser.admin){
            getNotificationForAdmin()
            .then(resp=>{
                setNots(resp);
                setLoading(false);
            }).catch(err => {
                console.error(err)
                let list = [];
                list.push("No notifications yet");
                setNots(list);
                setLoading(false);
            })
        }else{
            getNotificationForCurrentUser()
            .then(resp=>{
                setNots(resp);
                setLoading(false);
            }).catch(err => {
                console.error(err);
                let list = [];
                list.push("No notifications yet");
                setNots(list);
                setLoading(false);
            })
        }
        }
    },[currentUser])

    //Handles click on a notification in the notification list
    //vacationRequest is updated with the request fetched from the current request_id
    //notification.notification_id is the request_id corresponding to the notification
    function handleGoToRequest(notification){
        if (currentUser.admin){
            getVacationRequestByIDasAdmin(notification.notification_id)
            .then(resp => {
                    setVacationRequest(resp)
                }
            ).catch(err => {
                console.error(err);
                alert("The vacation request you are looking for does no longer seem to exist in the system");
            });
        } else {
            getVacationRequestByID(notification.notification_id)
            .then(resp => {
                setVacationRequest(resp)
            }).catch(err => {
                console.error(err);
                alert("The vacation request you are looking for does no longer seem to exist in the system");
            });
        }
    }

    //Listens to change in vacationRequest and redirects to /ViewVacationRequest with vacationRequest as prop
    useEffect(()=>{
        if (vacationRequest != null){
            console.log(props)
            props.history.push({
                pathname: "/ViewVacationRequest",
                state: {
                    request : vacationRequest
                } 
            })
        }
    },[vacationRequest])

 
    return(
        <Container>
            <Row>
            <Col md={{ span: 8, offset: 2 }}>
                <h1>Notifications</h1>
            </Col>
            </Row>
            {loading ? 
                <Row><Col md={{ span: 8, offset: 5 }}> <Spinner animation="border"/></Col></Row> 
                : (
                    <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <List>
                            {nots.slice(0).reverse().map((element, index) => {
                                if (element === "No notifications yet"){
                                    return(<ListItem><ListItemText>{element}</ListItemText></ListItem>)
                                } else{
                                    return(<ListItem button onClick={e => handleGoToRequest(element)}><ListItemText>{element.datetimestamp} {element.message}</ListItemText></ListItem>)
                                }
                            })}
                        </List>
                    </Col>
                    </Row>
                )}            
        </Container>
    )
}

export default NotificationsView;
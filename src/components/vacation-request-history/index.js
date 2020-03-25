import React, { useEffect, useState } from "react";
import { List, ListItemText, ListItem, Divider } from '@material-ui/core';
import { getUserRequestsById } from "../../utils/APIUtils";
import { Spinner } from 'react-bootstrap';
import HistoryListItem from '../../components/history-list-item/index';
import './vacationRequestHistory.css';

//for admin
const VacationRequestHistory = (props) => {

    const userId = props.location.state.user.id;
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserRequestsById(userId)
            .then(resp => {
                setRequests(resp);
                setLoading(false);
            })
            .catch(error => { console.error('Error:', error) })

    }, [])

    useEffect(() => { }, [requests])



    if (props.currentUser.admin) {
        return (
            <div>
                <List>
                    <Divider />
                    <ListItem>
                        <ListItemText>{props.location.state.user.name}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>ID : {props.location.state.user.id}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>E-mail: {props.location.state.user.email}</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem className="historyInfo">
                        <ListItemText>Her skal number of available and remaining vacation days</ListItemText>
                    </ListItem>
                    <Divider />
                </List>
                {loading ? (<Spinner animation="border" />) : (
                    <List>
                        {requests.map((element, index) => {
                            return (
                                <HistoryListItem key={element.request_id} element={element} parentProps={props} />
                            )
                        })}
                    </List>
                )}
            </div>
        )
    } else {
        return (
            <List>
                {requests.map((element, index) =>
                    element.status[0].status === "Approved" ?

                        <ListItem key={element.request_id}>{element.title} {element.period_start} - {element.period_end} {element.status[0].status}</ListItem>
                        :
                        null

                )}
            </List >
        )
    }



}

export default VacationRequestHistory;
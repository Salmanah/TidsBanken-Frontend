import React, { useEffect, useState } from "react";
import { List, ListItemText, ListItem, Divider } from '@material-ui/core';
import { getUserRequestsById } from "../../utils/APIUtils";
import { getNumberOfVacationDaysSpent } from "../../utils/common";
import { Spinner, Container, Row, Col } from 'react-bootstrap';
import HistoryListItem from '../../components/history-list-item/index';
import './vacationRequestHistory.css';

//for admin
const VacationRequestHistory = (props) => {

    const userId = props.location.state.user.id;
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [spentVacationDays, setSpentVacationDays] = useState([]);
    const [totalVacationDays] = useState(25);
    const [remainingVacationDays, setRemainingVacationDays] = useState(25);

    useEffect(() => {
        getUserRequestsById(userId)
            .then(resp => {
                setRequests(resp);
                setLoading(false);
            })
            .catch(error => { console.error('Error:', error) })

    }, [])

    useEffect(() => {
        let spent = getNumberOfVacationDaysSpent(requests);
        setSpentVacationDays(spent)
    }, [requests])

    useEffect(() => {

        setRemainingVacationDays(totalVacationDays - spentVacationDays)

    }, [spentVacationDays])



    if (props.currentUser.admin) {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
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
                                    <ListItemText> This user has {remainingVacationDays} of {totalVacationDays} vacation days left</ListItemText>
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
                    </Col>
                </Row>
            </Container>

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
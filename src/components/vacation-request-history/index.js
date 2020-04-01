import React, { useEffect, useState } from "react";
import { List, ListItemText, ListItem, Divider } from '@material-ui/core';
import { getUserRequestsById, getMaxVacationDays } from "../../utils/APIUtils";
import { getNumberOfVacationDaysSpent } from "../../utils/common";
import { Spinner, Container, Row, Col } from 'react-bootstrap';
import HistoryListItem from '../../components/history-list-item/index';
import './vacationRequestHistory.css';


//Displays all requests belonging to a user. If the one viewing the list is not admin or owner, 
//only approved requests are displayed.
const VacationRequestHistory = (props) => {


    const userId = props.location.state.user.id;
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [spentVacationDays, setSpentVacationDays] = useState([]);
    const [totalVacationDays, setTotalVacationDays] = useState();
    const [remainingVacationDays, setRemainingVacationDays] = useState(25);


    useEffect(() => {
        getUserRequestsById(userId)
            .then(resp => {
                setRequests(resp);
                setLoading(false);
            })
            .catch(error => { console.error('Error:', error) })
        getMaxVacationDays().then(resp => setTotalVacationDays(resp)).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let spent = getNumberOfVacationDaysSpent(requests);
        setSpentVacationDays(spent)
    }, [requests])

    useEffect(() => {
        setRemainingVacationDays(totalVacationDays - spentVacationDays)
    }, [spentVacationDays, totalVacationDays])



    if (props.currentUser.admin) {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h1>Vacation request history</h1>
                        <div>
                            <List>
                                <Divider />
                                <ListItem>
                                    <ListItemText>{props.location.state.user.name}</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>ID : {props.location.state.user.id}</ListItemText>
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
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h1>Vacation request history</h1>
                        <List>
                            <Divider />
                            <ListItem>
                                <ListItemText>{props.location.state.user.name}</ListItemText>
                            </ListItem>
                            <Divider />
                        </List>
                        {loading ? (<Spinner animation="border" />) : (
                            <List>
                                {requests.map((element, index) =>
                                    element.status[0].status === "Approved" ?
                                        <HistoryListItem key={element.request_id} element={element} parentProps={props} />
                                        //<ListItem key={element.request_id}>{element.title} {element.period_start} - {element.period_end} {element.status[0].status}</ListItem>
                                        :
                                        null
                                )}
                            </List >
                        )}

                    </Col>
                </Row>
            </Container>

        )
    }



}

export default VacationRequestHistory;
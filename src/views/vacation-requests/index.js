import React, { useEffect, useState } from "react";
import './vacationRequests.css';
import { Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@material-ui/core';
import RequestListItem from '../../components/request-list-item/index';
import { getUserRequestsById, getMaxVacationDays } from '../../utils/APIUtils';
import { getNumberOfVacationDaysSpent } from '../../utils/common';
import RemainingVacationDays from '../../components/remaining-vacation-days/index';
import { Container, Col, Row } from 'react-bootstrap';

//User view that displays all of the users own vacation requests together with the RemainingVacationDays-component
//Each request is rendered as RequestListItem components. The list can be filtered by status, this is done by having
//the user toggle radio buttons in front end.
const VacationRequests = (props) => {

    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([])
    const [spentVacationDays, setSpentVacationDays] = useState([]);
    const [totalVacationDays, setTotalVacationDays] = useState();
    const [remainingVacationDays, setRemainingVacationDays] = useState()
    const [radioValue, setRadioValue] = useState('showAll');

    //fetches all vacation requests created by the user specified by currentUser.id 
    useEffect(() => {
        getUserRequestsById(props.currentUser.id)
            .then(resp => {
                setRequests(resp);
                setFilteredRequests(resp)
                setLoading(false);
            }).catch(err => console.error(err))
        getMaxVacationDays().then(resp => setTotalVacationDays(resp)).catch(err => console.log(err))
    }, [props.currentUser.id])


    //when the request have been fetched, this useEffect gets and sets the number of vacation days spent 
    useEffect(() => {
        let spent = getNumberOfVacationDaysSpent(requests);
        setSpentVacationDays(spent)
    }, [requests])

    //when spentVacationDays or totalVacationDays is updated, this useEffect sets RemainaingVacationDays
    useEffect(() => {
        setRemainingVacationDays(totalVacationDays - spentVacationDays)
    }, [spentVacationDays, totalVacationDays])


    //listens for user interaction with the radio buttons in the frontend and sets radioValue accrodingly
    function handleChange(event) {
        if (event.target.value === "approved") {
            setRadioValue("approved")
        }
        else if (event.target.value === "pending") {
            setRadioValue("pending")
        }
        else if (event.target.value === "denied") {
            setRadioValue("denied")
        }
        else {
            setRadioValue("showAll")
        }
    }


    //on update of radioValue, this useEffect filters the request list that is displayed on the frontend
    useEffect(() => {
        if (radioValue === "approved") {
            let tempRequests = requests.filter(e => {
                return e.status[0].status === "Approved"
            })
            setFilteredRequests(tempRequests)
        }
        else if (radioValue === "pending") {
            let tempRequests = requests.filter(e => {
                return e.status[0].status === "Pending"
            })
            setFilteredRequests(tempRequests)
        }
        else if (radioValue === "denied") {
            let tempRequests = requests.filter(e => {
                return e.status[0].status === "Denied"
            })
            setFilteredRequests(tempRequests)
        }
        else {
            setFilteredRequests(requests)
        }
    }, [radioValue])

    return (
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1>My vacation requests</h1>
                   
                </Col>
            </Row> 
            <Row size="sm">
                <Col md={{ span: 8, offset: 2 }}>
                    <RemainingVacationDays spent={spentVacationDays} total={totalVacationDays} remaining={remainingVacationDays} />
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <FormControl>
                        <FormLabel>
                            <RadioGroup row aria-label="status" name="status" value={radioValue} onChange={e => handleChange(e)}>
                                <FormControlLabel control={<Radio value="showAll" />} label="Show all" />
                                <FormControlLabel control={<Radio value="approved" />} label="Approved" />
                                <FormControlLabel control={<Radio value="pending" />} label="Pending" />
                                <FormControlLabel control={<Radio value="denied" />} label="Denied" />
                            </RadioGroup>
                        </FormLabel>
                    </FormControl>
                </Col>
            </Row>
            <Row>
                <Col>
                    {filteredRequests.map((request) => {
                        return (
                            <RequestListItem request={request} parentProps={props} />
                        )
                    })}
                </Col>
            </Row>
        </Container>
    )
}

export default VacationRequests;
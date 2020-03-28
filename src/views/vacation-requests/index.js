import React, { useEffect, useState } from "react";
import './vacationRequests.css';
import { Radio, RadioGroup, List, CircularProgress, FormGroup, FormControl, FormLabel, FormControlLabel, Checkbox } from '@material-ui/core';
import RequestListItem from '../../components/request-list-item/index';
import { getUserRequestsById } from '../../utils/APIUtils';
import { getNumberOfVacationDaysSpent } from '../../utils/common';
import ToggleBox from '../../components/toggle-box/index';
import RemainingVacationDays from '../../components/remaining-vacation-days/index';
import { Container, Col, Row } from 'react-bootstrap';

const VacationRequests = (props) => {

    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([])
    const [spentVacationDays, setSpentVacationDays] = useState([]);
    const [totalVacationDays] = useState(25);
    const [remainingVacationDays, setRemainingVacationDays] = useState(25);
    const status = ["Pending", "Approved", "Denied"]
    const [changed, setChanged] = useState(false);
    const [radioValue, setRadioValue] = React.useState('showAll');

    useEffect(() => {

        getUserRequestsById(props.currentUser.id)
            .then(resp => {
                setRequests(resp);
                setFilteredRequests(resp)
                setLoading(false);
            }).catch(err => console.error(err))
    }, [props.currentUser.id])


    useEffect(() => {

        let spent = getNumberOfVacationDaysSpent(requests);
        setSpentVacationDays(spent)

    }, [requests])


    useEffect(() => {

        setRemainingVacationDays(totalVacationDays - spentVacationDays)

    }, [spentVacationDays])



    function handleChange(event){
        if (event.target.value === "approved"){
            setRadioValue("approved")
        } 
        else if (event.target.value === "pending"){
            setRadioValue("pending")
        }
        else if (event.target.value === "denied"){
            setRadioValue("denied")
        }
        else{
            setRadioValue("showAll")
        }
    }

    

    useEffect(()=>{

        if (radioValue === "approved"){

            let tempRequests = requests.filter(e=>{
                return e.status[0].status === "Approved"
            })

            setFilteredRequests(tempRequests)
        } 
        else if (radioValue === "pending"){
            let tempRequests = requests.filter(e=>{
                return e.status[0].status === "Pending"
            })
            setFilteredRequests(tempRequests)
        }
        else if (radioValue === "denied") {
            let tempRequests = requests.filter(e=>{
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
            <h1>My vacation requests</h1>
            <Row>
                <Col>
                    <RemainingVacationDays spent={spentVacationDays} total={totalVacationDays} remaining={remainingVacationDays} />
                </Col>
            </Row>
            <Row>
                <Col>
                <FormControl>
                    <FormLabel>
                        <RadioGroup row  aria-label="status" name="status" value={radioValue} onChange={e => handleChange(e)}>
                        <FormControlLabel control={<Radio value="showAll"/> }label="Show all"/>
                        <FormControlLabel control={<Radio  value="approved" />}label="Approved"/>
                        <FormControlLabel control={<Radio  value="pending" />}label="Pending"/>
                        <FormControlLabel control={<Radio  value="denied" />}label="Denied"/>
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


/*
            <Row>
                {status.map((st) => {
                    return (
                        <Col>
                            <ToggleBox title={st}>
                                {loading ? (<CircularProgress />)
                                    : (
                                        <List>
                                            {requests.map((request) => {
                                                if (request.status[0].status === st) {
                                                    return (
                                                        <RequestListItem request={request} parentProps={props} />
                                                    )
                                                }
                                            }
                                            )}
                                        </List>
                                    )
                                }
                            </ToggleBox>
                        </Col>)
                })}
                <Col>
                    <ToggleBox title="all">
                        <div>
                            {loading ? (<CircularProgress />)
                                : (
                                    <List>
                                        {requests.map(
                                            (request, index) => {
                                                return (
                                                    <div>
                                                        <RequestListItem request={request} parentProps={props} />
                                                    </div>
                                                )
                                            }
                                        )}
                                    </List>

                                )}
                        </div>
                    </ToggleBox>
                </Col>
                                        </Row>*/
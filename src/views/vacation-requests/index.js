import React, { useEffect, useState } from "react";
import './vacationRequests.css';
import { List, CircularProgress } from '@material-ui/core';
import RequestListItem from '../../components/request-list-item/index';
import { getUserRequestsById } from '../../utils/APIUtils';
import { getNumberOfVacationDaysSpent } from '../../utils/common';
import ToggleBox from '../../components/toggle-box/index';
import RemainingVacationDays from '../../components/remaining-vacation-days/index';
import { Container, Col, Row } from 'react-bootstrap';

const VacationRequests = (props) => {

    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [spentVacationDays, setSpentVacationDays] = useState([]);
    const [totalVacationDays] = useState(25);
    const [remainingVacationDays, setRemainingVacationDays] = useState(25);
    const status = ["Pending", "Approved", "Denied"]

    useEffect(() => {

        getUserRequestsById(props.currentUser.id)
            .then(resp => {
                setRequests(resp);
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

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <RemainingVacationDays spent={spentVacationDays} total={totalVacationDays} remaining={remainingVacationDays} />
                </Col>
            </Row>
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
            </Row>
        </Container>
    )
}

export default VacationRequests;
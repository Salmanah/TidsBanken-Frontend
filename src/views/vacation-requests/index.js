import React, { useEffect } from "react";
import './vacationRequests.css';
import { List, CircularProgress } from '@material-ui/core';
import RequestListItem from '../../components/request-list-item/index';
import { getUserRequestsById } from '../../utils/APIUtils';
import ToggleBox from '../../components/toggle-box/index';
import { Container, Col, Row } from 'react-bootstrap';


const VacationRequests = (props) => {

    const [loading, setLoading] = React.useState(true);

    const [requests, setRequests] = React.useState([]);


    useEffect(() => {

        getUserRequestsById(props.currentUser.id)
            .then(resp => {
                setRequests(resp);
                setLoading(false);
            }).catch(err => console.error(err))
    }, [props.currentUser.id])

    const status = ["Pending", "Approved", "Denied"]

    return (
        <Container>
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
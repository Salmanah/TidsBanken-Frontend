import React, {useEffect} from "react";
import './vacationRequests.css';
import { List, CircularProgress } from '@material-ui/core';
import RequestListItem from '../../components/requestListItem/index';
import {getUserRequestsById, getUserRequestAndApproved} from '../../utils/APIUtils';
import ToggleBox from '../../components/toggle-box/index';
import {Container, Col, Row} from 'react-bootstrap';
 

const VacationRequests = (props) => {

    const [loading, setLoading] = React.useState(true);

    const [requests, setRequests] = React.useState([]);


    useEffect(()=>{

        getUserRequestsById(props.currentUser.id)
        .then(resp => {
            setRequests(resp);
            setLoading(false);
        }).catch(err => console.error(err))
    },[])

    const status = ["Pending", "Approved", "Denied"]

    return (

        <div>
            <Container>
            <Row>
                {status.map((st, index)=>{
                    return(
                    
                        <Col><ToggleBox title={st}>
                        { loading ? (<CircularProgress/>)
                        : (
                            <div>
                                <List>
                                    {requests.map((request, index) => {
                                        if (request.status[0].status === st) {
                                            return (
                                                    <RequestListItem request={request} parentProps={props}/>
                                                )
                                            }
                                        }
                                    )}
                                </List>
                            </div>
                        )
                        }
                    </ToggleBox>
                    </Col>)
                })}
                <Col>
                <ToggleBox title="all">
                    <div>
                    {loading ? (<CircularProgress/>)
                    :(
                        <div>
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
                        </div>
                    )} 
                    </div>
                </ToggleBox>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default VacationRequests;
import React, {useEffect} from "react";
import './vacationRequests.css';
import { List, Divider } from '@material-ui/core';
import RequestListItem from '../../components/requestListItem/index';
import {getUserRequestAndApproved} from '../../utils/APIUtils';

const VacationRequests = (props) => {

    /*const [admin, setAdmin] = React.useState(null);

    useEffect(() => {
        getCurrentUser().then(resp => { setAdmin(resp.admin) })

    }, [])*/

    const [requests, setRequests] = React.useState([]);

    const [element, setElement] = React.useState(Object);

    var reqs = [];

    useEffect(()=>{
        

        console.log("gettin requests")
        getUserRequestAndApproved().then(resp => {
            console.log(resp)
            resp.forEach(element => {
                console.log(element.request_id);
                reqs.push(element)
            })
            setRequests(reqs)
        })
        
    })

    return (
        <div>
            <div className="vacationRequestContent">
                <h3>This is the request list of user with id: {props.currentUser.id}</h3>
                <h4>Name: {props.currentUser.name}</h4>
                <div>
                    <List>
                        {requests.map(
                            (element, index) => {
                                return (
                                    <div>
                                        <RequestListItem title={element.title} parentProps={props} />
                                        <Divider/>
                                    </div>
                                    )
                            }
                        )}
                        {/*
                        <RequestListItem title="Request 1" parentProps={props} />
                        <Divider />
                        <RequestListItem title="Request 2" parentProps={props} />
                        <Divider />
                        */}
                    </List>
                    {/*
                    <ToggleBox title="request history">
                        <VacationRequestHistory />
                    </ToggleBox>
                    */}
                </div>
            </div>
        </div>
    )
}

export default VacationRequests;
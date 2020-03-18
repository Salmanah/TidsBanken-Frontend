import React from "react";
import './vacationRequests.css';
import { List, Divider } from '@material-ui/core';
import RequestListItem from '../../components/requestListItem/index';

const VacationRequests = (props) => {

    return (
        <div>
            <div className="vacationRequestContent">
                <h3>This is the request list of user with id: {props.currentUser.id}</h3>
                <h4>Name: {props.currentUser.name}</h4>
                <div>
                    <List>
                        <RequestListItem title="Request 1" parentProps={props} />
                        <Divider />
                        <RequestListItem title="Request 2" parentProps={props} />
                        <Divider />
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
import React from "react";
import './vacationRequests.css';
import { List, Divider } from '@material-ui/core';
import RequestListItem from '../../components/requestListItem/index';

const VacationRequests = () => {

    return (
        <div>
            <div className="vacationRequestContent">
                <h3>This is the request list of user with id: {this.props.currentUser.id}</h3>
                <h4>Name: {this.props.currentUser.name}</h4>
                <div>
                    <List>
                        <RequestListItem title="Request 1" parentProps={this.props} />
                        <Divider />
                        <RequestListItem title="Request 2" parentProps={this.props} />
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
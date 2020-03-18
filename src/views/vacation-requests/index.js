import React, { Component } from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom';
import VacationRequestHistory from '../../components/vacation-request-history/index';
import ViewVacationRequest from '../../components/view-vacation-request';
import ToggleBox from "../../components/toggle-box";
import ApplicationFrame from '../../components/application-frame/index';
import Cookies from 'universal-cookie';
import './vacationRequests.css';
import {List, ListItem, Divider} from '@material-ui/core';
import RequestListItem from '../../components/requestListItem/index';
import { getVacationRequests, createVacationRequest } from "../../utils/APIUtils";

class VacationRequests extends Component{
    constructor(props) {
        super(props);
    }


    render(){
        //console.log("In vacation requests")
        //console.log(this.props)

        return(
            <div>
                <div className="vacationRequestContent">
                    <h3>This is the request list of user with id: {this.props.currentUser.id}</h3>
                    <h4>Name: {this.props.currentUser.name}</h4>
                    <div>
                    <List>
                        <RequestListItem title="Request 1" parentProps={this.props} />
                        <Divider/>
                        <RequestListItem title="Request 2" parentProps={this.props}/>
                        <Divider/>
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
}


export default VacationRequests;
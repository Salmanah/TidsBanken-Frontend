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

class VacationRequests extends Component{
    constructor(props) {
        super(props);
    }


    render(){
        return(
            <div>
                <ApplicationFrame parentProps={this.props}/>
                <div className="vacationRequestContent">
                    Her ser jeg for meg: <br/>
                    En liste over alle vacation requests tilhørende innlogget user. <br/>
                    Hver request er presentert ved å displaye tittelen og er clickable. <br/>
                    <List>
                        <RequestListItem parentProps={this.props} />
                        <Divider/>
                    </List>
                    <ToggleBox title="request history">
                        <VacationRequestHistory />
                    </ToggleBox>
                </div>    
            </div>
        )
    }
}


export default VacationRequests;
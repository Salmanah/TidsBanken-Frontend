import React, { Component } from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom';
import VacationRequestHistory from '../../components/vacation-request-history/index';
import ViewVacationRequest from '../../components/view-vacation-request/index';
import ToggleBox from "../../components/toggle-box";
import ApplicationFrame from '../../components/application-frame/index';
import Cookies from 'universal-cookie';

class VacationRequests extends Component{

    render(){

        return(
            <div>
                <ApplicationFrame/>
                <ViewVacationRequest/>
                <ToggleBox title="request history">
				    <VacationRequestHistory />
			    </ToggleBox>
            </div>
        )
    }
}


export default VacationRequests;
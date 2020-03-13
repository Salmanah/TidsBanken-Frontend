import React, { Component } from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom';
import VacationRequestHistory from '../../components/vacation-request-history/index';
import ViewVacationRequest from '../../components/view-vacation-request/index';
import ToggleBox from "../../components/toggle-box";
import ApplicationFrame from '../../components/application-frame/index';
import Cookies from 'universal-cookie';
import './vacationRequests.css';

class VacationRequests extends Component{

    render(){

        return(
            <div>
                <ApplicationFrame/>
                <div className="vacationRequestContent">
                    Her ser jeg for meg: <br/>
                    En liste over alle vacation requests tilhørende innlogget user. <br/>
                    Hver request er presentert ved å displaye tittelen og er clickable. <br/>
                    {/*<ViewVacationRequest/>*/}
                    <ToggleBox title="request history">
                        <VacationRequestHistory />
                    </ToggleBox>
                </div>    
            </div>
        )
    }
}


export default VacationRequests;
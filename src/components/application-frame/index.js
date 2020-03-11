import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {MDBBtn} from 'mdbreact';
import AvailableActions from '../available-actions/index';
import Notifications from '../notifications/index';
import CurrentUser from '../current-user/index';
import './ApplicationFrame.css'

class ApplicationFrame extends Component{
    render(){
        return(
            <div className="container">
                <CurrentUser />
                <Notifications />
                <AvailableActions />
            </div>
        )
    }
}

export default ApplicationFrame;
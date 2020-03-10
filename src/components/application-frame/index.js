import React, {Component} from "react";
import AvailableActions from '../available-actions/index';
import Notifications from '../notifications/index';
import CurrentUser from '../current-user/index';
import './ApplicationFrame.css'

class ApplicationFrame extends Component{
    render(){
        return(
            <div className="container">
                <CurrentUser />
                <AvailableActions />
                <Notifications />
            </div>
        )
    }
}

export default ApplicationFrame;
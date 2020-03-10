import React, {Component} from "react";
import AvailableActions from '../available-actions/index';
import Notifications from '../notifications/index';
import CurrentUser from '../current-user/index';

class ApplicationFrame extends Component{
    render(){
        return(
            <div>
                <CurrentUser />
                <AvailableActions />
                <Notifications />
            </div>
        )
    }
}

export default ApplicationFrame;
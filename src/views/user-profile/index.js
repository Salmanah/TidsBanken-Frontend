import React, { Component } from "react";
import ApplicationFrame from '../../components/application-frame/index';

class UserProfile extends Component{
    render() {
        return(
            <div>
                <ApplicationFrame/>
                <h1>User profile</h1>  
            </div>
        ) 
    }
}

export default UserProfile;
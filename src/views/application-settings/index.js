import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import CreateUser from '../../components/create-user/index';

class ApplicationSettings extends Component{



    render() {
        return (
            <div>
                <h1>Application settings</h1>
                <CreateUser />
                <Button> Update user </Button> <br/> <br/>
                <Button> Change max vacation period </Button> <br/> <br/>
                <Button> Import vacation data (in JSON format) </Button> <br/> <br/>
                <Button> Export vacation data (in JSON format) </Button>
            </div>
            
        )
    }
}

export default ApplicationSettings;

//
//IKKE LENGER I BRUK 
//

import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import ApplicationFrame from '../../components/application-frame/index';
import './applicationSettings.css';
import { Link } from 'react-router-dom';

class ApplicationSettings extends Component {

    render() {
        return (
            <div>
                <ApplicationFrame />
                <div className="settingsContent">
                    <h1>Application settings</h1>
                    <Link to="/Users"><Button>Users</Button></Link> <br /> <br />
                    <Button> Change max vacation period </Button> <br /> <br />
                    <Button> Import vacation data (in JSON format) </Button> <br /> <br />
                    <Button> Export vacation data (in JSON format) </Button>
                </div>
            </div>
        )
    }
}

export default ApplicationSettings;
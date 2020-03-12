import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import ApplicationFrame from '../../components/application-frame/index';
import {Link} from 'react-router-dom';
import './vacationSettings.css';

class VacationSettings extends Component{

    render() {
        return (
            <div>
                <ApplicationFrame />
                <div className="settingsContent">
                    <h1>Vacation settings</h1>
                    <Button> Change max vacation period </Button> <br/> <br/>
                    <Button> Import vacation data (in JSON format) </Button> <br/> <br/>
                    <Button> Export vacation data (in JSON format) </Button>
                </div>
                
            </div>
            
        )
    }
}

export default VacationSettings;
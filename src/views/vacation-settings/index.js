import React from "react";
import { Button } from 'react-bootstrap';
import './vacationSettings.css';

const VacationSettings = () => {

    return (
        <div>
            <div className="settingsContent">
                <h1>Vacation settings</h1>
                <Button> Change max vacation period </Button> <br /> <br />
                <Button> Import vacation data (in JSON format) </Button> <br /> <br />
                <Button> Export vacation data (in JSON format) </Button>
            </div>

        </div>
    )
}

export default VacationSettings;
import React, { useEffect } from 'react';
import { Switch } from '@material-ui/core/';
import { Col } from "react-bootstrap";

function ToggleVacationsCalendar() {

    const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        checkSelected();
    });

    const toggleChecked = () => {
        setChecked(prev => !prev);
    };

    function checkSelected() {
        let allVacations = document.getElementById("viewAllVacationsCalendar");
        let myVacations = document.getElementById("viewMyVacationRequestsCalendar");
        if (!checked) {
            myVacations.style.color = "#f50057"
            allVacations.style.color = "black"
        } else {
            allVacations.style.color = "#f50057"
            myVacations.style.color = "black"
        }
    }

    return (
        <Col md={6} className="text-center">
            <label id="viewMyVacationRequestsCalendar">My vacation requests</label>
            <Switch checked={checked} onChange={toggleChecked} />
            <label id="viewAllVacationsCalendar">All co-workers vacation</label>
        </Col>
    )
}

export default ToggleVacationsCalendar;
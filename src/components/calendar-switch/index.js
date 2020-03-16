import React, { useEffect } from 'react';
import { Switch } from '@material-ui/core/';
import { Col } from "react-bootstrap";
import './calendar-switch.css';

const ToggleVacationsCalendar = props => {
    let { isChecked } = props;

    ///const [checked, setChecked] = React.useState(false);

    useEffect(() => {
        checkSelected();
        console.log(isChecked)
    });

    const toggleChecked = () => {
        if (isChecked === false) {
            isChecked = true;
        }
        if (isChecked === true) {
            isChecked = false;
        }

        console.log(isChecked)
        //props.isChecked(prev => !prev);
    };

    function checkSelected() {
        let allVacations = document.getElementById("viewAllVacationsCalendar");
        let myVacations = document.getElementById("viewMyVacationRequestsCalendar");
        if (!isChecked) {
            myVacations.style.color = "#009688"
            allVacations.style.color = "black"
            myVacations.style.textDecoration = "underline";
            allVacations.style.textDecoration = "none";
        } else {
            allVacations.style.color = "#f50057";
            myVacations.style.textDecoration = "none";
            myVacations.style.color = "black";
            allVacations.style.textDecoration = "underline";
        }
    }

    return (
        <div>
            <label id="viewMyVacationRequestsCalendar">My vacation requests</label>
            <Switch checked={isChecked} onChange={toggleChecked} />
            <label id="viewAllVacationsCalendar">All co-workers vacation</label>
        </div>
    )
}

export default ToggleVacationsCalendar;
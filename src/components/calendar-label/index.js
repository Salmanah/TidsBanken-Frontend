import React from 'react';
import { MDBBadge } from "mdbreact";
import './calendar-label.css';

const CalendarLabel = props => {
    let labels = [];
    props.labels.forEach(status => {
        let statusLowerCase = status.toLowerCase();
        labels.push(
            <React.Fragment key={statusLowerCase}>
                <MDBBadge className={`pr-4 mx-2 calendar-label ${statusLowerCase}-label`}>
                    <span hidden>label</span>
                </MDBBadge>
                <span>{status} vacation</span>
            </React.Fragment>)
    });

    return (
        <>
            {labels}
        </>
    )
}
export default CalendarLabel;

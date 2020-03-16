import React from 'react';
import { MDBBadge, MDBContainer } from "mdbreact";
import './calendar-label.css';

const CalendarLabel = () => {
    return (
        <MDBContainer>
            <MDBBadge className="pr-4 mx-2 calendar-label ineligible-label"><span hidden>label</span></MDBBadge>
            <span>Ineligible for vacation </span>
            <MDBBadge className="pr-4 mx-2 calendar-label approved-label"><span hidden>label</span></MDBBadge>
            <span>Approved for vacation </span>
            <MDBBadge className="pr-4 mx-2 calendar-label pending-label"><span hidden>label</span></MDBBadge>
            <span>Pending for vacation </span>
        </MDBContainer>
    )
}
export default CalendarLabel;

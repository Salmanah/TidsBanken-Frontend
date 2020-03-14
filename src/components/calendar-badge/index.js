
import React from "react";
import './calendar-badge.css';
import { Badge } from 'react-bootstrap';
const CalendarBadge = props => {
    return (
        <Badge className="m-1" variant='light'>
            {props.name}<a type="button" className="delete-search pr-1 pl-1"> X</a>
        </Badge>
    )
}
export default CalendarBadge;
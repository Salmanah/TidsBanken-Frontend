
import React from "react";
import './calendar-badge.css';
import { Badge } from 'react-bootstrap';
const CalendarBadge = props => {
    return (
        <Badge className="m-1 tags-search" variant='light'>
            {props.name}
            <button type="button" onClick={props.delete} className="delete-search pr-1 pl-1"> X</button>
        </Badge>
    )
}
export default CalendarBadge;
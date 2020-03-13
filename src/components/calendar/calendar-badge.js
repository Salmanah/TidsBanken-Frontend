
import React from "react";
import { Badge } from 'react-bootstrap';
const CalendarBadge = props => {
    console.log(props)
    return (
        <Badge className="m-1" pill variant='light'>
            {props.name}<a type="button"> X</a>
        </Badge>
    )
}
export default CalendarBadge;
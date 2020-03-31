import React from 'react';
import './remaining-vacation-days.css';
import { Col, Row } from 'react-bootstrap';


const RemainingVacationDays = (props) => {
    return (
        <>
            <Row className="py-4">
                <Col  className="p-2">
                    <h5 className="my-0">
                        <span>You have </span>
                        <span className="circled px-2 py-1">{props.remaining}</span>
                        <span> vacation days left</span>
                    </h5>
                    <strong className="pl-2">You have spent <span>{props.spent}</span> of your <span>{props.total}</span> vacation days this year</strong>
                </Col>
            </Row>
        </>
    )
}


export default RemainingVacationDays;
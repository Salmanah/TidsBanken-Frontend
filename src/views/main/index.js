import React from 'react';
import Calendar from "../../components/calendar";
import { Row, Col } from "react-bootstrap";
import ApplicationFrame from '../../components/application-frame/index';
import VacationRequests from '../../views/vacation-requests/index'



function Main() {
    return (
        <div className="Main">
            <h1>Vacation planner</h1>
            <Row>
                <Col md={12}>
                    <Calendar />
                </Col>
            </Row>
        </div>
    );
}

export default Main;
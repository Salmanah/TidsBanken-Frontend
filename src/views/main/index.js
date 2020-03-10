import React from 'react';
import Calendar from "../../components/calendar";
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import ApplicationFrame from '../../components/application-frame/index';


function Main() {
    return (
        <div className="Main">
            <h1>Vacation planner</h1>
            <ApplicationFrame />
            <Row>
                <Col md={12}>
                    <Calendar />
                </Col>
            </Row>
        </div>
    );
}

export default Main;
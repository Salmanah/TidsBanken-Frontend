import React from 'react';
import Calendar from "../../components/calendar";
import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';


function Main() {
    return (
        <div className="Main">
            <h1>Vacation planner</h1>
            <nav>
                <Link to="/UserProfile">User profile</Link> <br />
                <Link to="/CreateVacationRequest">Create vacation request</Link> <br />
                <Link to="/ViewVacationRequest">View vacation request</Link> <br />
                <Link to="/ViewRequestHistory">View request history</Link> <br />
                <Link to="/CreateIneligiblePeriod">Create ineligible period (for admin)</Link> <br />
                <Link to="/LoginPage">Go to login page</Link> <br />
                <Link to="/ApplicationSettings">Application settings (for admin)</Link>
            </nav>
            <Row>
                <Col md={12}>
                    <Calendar />
                </Col>
            </Row>
        </div>
    );
}

export default Main;
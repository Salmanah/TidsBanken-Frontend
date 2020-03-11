import React from 'react';
import Calendar from "../../components/calendar";
import { Row, Col } from "react-bootstrap";
import ApplicationFrame from '../../components/application-frame/index';
import VacationRequests from '../../views/vacation-requests/index';
import CreateIneligiblePeriod from '../../views/create-ineligible-period';
import {MDBBtn} from 'mdbreact';
import {Link} from 'react-router-dom';
import CreateVacationRequest from '../../views/create-vacation-request/index';



function Main() {

    return (
        <div className="Main">
            <ApplicationFrame/>
            <h1>Vacation planner</h1>
            
            <div id="createForAdmin">
                <CreateIneligiblePeriod />
            </div>
            <div id="createForUser">
                <Link to="/CreateVacationRequest"><MDBBtn color="primary">Create vacation request</MDBBtn></Link> 
            </div>
            <Row>
                <Col md={12}>
                    <Calendar />
                </Col>
            </Row>
        </div>
    );
}

export default Main;
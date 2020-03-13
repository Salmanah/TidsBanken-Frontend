import React from 'react';
import Calendar from "../../components/calendar";
import { Row, Col } from "react-bootstrap";
import ApplicationFrame from '../../components/application-frame/index';
import VacationRequests from '../../views/vacation-requests/index';
import CreateIneligiblePeriod from '../../views/create-ineligible-period';
import {MDBBtn} from 'mdbreact';
import {Link} from 'react-router-dom';
import CreateVacationRequest from '../../views/create-vacation-request/index';
import Cookies from 'universal-cookie';
import './main.css';



function Main() {

   
        return (
            <div><h1>MAIN INDEX.JS</h1></div>
        )
}    
    
  /*  const cookie = new Cookies();
    console.log(cookie.get('info').name)
    console.log(cookie.get('info').role)

    const role = cookie.get('info').role;

    if (role === 'user'){
        return(
            <div className="Main">
                <ApplicationFrame/>
                <div className="contentContainer">
                    <h1>Vacation planner</h1>
                    <Link to="/CreateVacationRequest"><MDBBtn color="primary">Create vacation request</MDBBtn></Link>
                    <Row>
                        <Col md={12}>
                            <Calendar />
                        </Col>
                    </Row>
                </div>
                
            </div>
        )
    } 
    else if (role === 'admin'){
        return (
            <div className="Main"> 
             <ApplicationFrame/>
             <div className="contentContainer">
                <h1>Vacation planner</h1>
                 <CreateIneligiblePeriod />
                <Row>
                    <Col md={12}>
                        <Calendar />
                    </Col>
                </Row>
             </div>
             
        </div>
        )
    }
    else {
        return(
           <div>
            Something wrong with role in cookie
        </div> 
        )
        
    }*/


export default Main;
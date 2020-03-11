import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import { Dropdown, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {MDBBtn} from 'mdbreact';

class AvailableActions extends Component{
    render(){
        return(
            <div>
                {/*
                <div>
                    <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-actions">
                        Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/UserProfile">View user profile</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/CreateVacationRequest">Create vacation request</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/VacationRequests">Vacation requests</Link></Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div>
                    <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Actions (for admin)
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/CreateIneligiblePeriod">Create ineligible period (for admin)</Link> </Dropdown.Item>
                        <Dropdown.Item><Link to="/ApplicationSettings">Application settings (for admin)</Link></Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
                */}
                <div id="userActions">
                    <Link to="/">Home</Link> {' '}
                    <Link to="/UserProfile">User profile</Link> {' '}
                    <Link to="/VacationRequests">Vacation requests</Link> {' '}
                    <Link to="/LoginPage"><MDBBtn color="primary">Log out</MDBBtn></Link>
                </div>
                <div id="adminActions">
                    <Link to="/">Home</Link> {' '}
                    <Link to="ApplicationSettings">Settings</Link> {' '}
                    <Link to="/LoginPage"><MDBBtn color="primary">Log out</MDBBtn></Link>
                </div>
            </div>
            
        )
    }
}

export default AvailableActions;
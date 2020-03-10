import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import { Dropdown, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

class AvailableActions extends Component{
    render(){
        return(
            <div>
                <div>
                    <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-actions">
                        Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/UserProfile">View user profile</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/CreateVacationRequest">Create vacation request</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/ViewVacationRequest">View vacation request</Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/ViewRequestHistory">View request history</Link></Dropdown.Item>
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
                
            </div>
            
        )
    }
}

export default AvailableActions;
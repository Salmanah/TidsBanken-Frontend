import React, { Component } from "react";
import {Link, NavLink} from 'react-router-dom';
import { Dropdown, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

//skal returnere 
class Notifications extends Component{
    render(){
        return(
            <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="warning" id="dropdown-notifications">
                            Notifications
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                Notification 1
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Notification 2
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
        )
    }
}

export default Notifications;
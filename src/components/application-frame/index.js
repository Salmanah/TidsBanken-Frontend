import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {MDBBtn} from 'mdbreact';
import AvailableActions from '../available-actions/index';
import Notifications from '../notifications/index';
import CurrentUser from '../current-user/index';
import './ApplicationFrame.css';
import {Navbar, Nav, NavDropdown, NavbarBrand, Button} from 'react-bootstrap';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';


class ApplicationFrame extends Component{
    

    render(){
        const navDropdownTitle = ( <span><NotificationsIcon size="sm"/></span> );
        const settingsTitle = (<span><SettingsIcon size="sm"/></span>);

        return(
            <div className="container">
                <div id="apFrameForUsers">
                    <Navbar fixed="top" expand="md" bg="dark" variant="dark">
                        <Navbar.Brand>Tidsbanken</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="/"> Home</Nav.Link>
                            <Nav.Link href="/VacationRequests">Vacation requests</Nav.Link>
                            <NavDropdown title={navDropdownTitle}>

                            </NavDropdown>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text> Signed in as: <Link to="/UserProfile">User name</Link></Navbar.Text>
                            <Button variant="outline-secondary" href="/LoginPage">Log out</Button>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                {/* Elementet under vises ikke pga fixed="top" i div over*/}
                <div id="apFrameForAdmin">
                    <Navbar expand="md" bg="dark" variant="dark">
                    <Navbar.Brand>Tidsbanken</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/"> Home</Nav.Link>
                        <NavDropdown title={navDropdownTitle}>

                        </NavDropdown>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text> Signed in as: <Link to="/UserProfile">Admin name</Link></Navbar.Text>
                        <Nav>
                            <Nav.Link href="/ApplicationSettings"> <SettingsIcon/></Nav.Link>
                        </Nav>
                        
                    </Navbar.Collapse>
                    </Navbar>

                </div>
                
            </div>
        )
    }
}

export default ApplicationFrame;
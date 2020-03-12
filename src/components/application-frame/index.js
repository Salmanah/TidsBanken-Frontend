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
import Cookies from 'universal-cookie';


class ApplicationFrame extends Component{
/*
    constructor(props){
        const cookie = new Cookies();
        super(props)
        this.state = {
            name : cookie.get('info').name,

        }
    }
    

    render(){

        const cookie = new Cookies();

        const role = cookie.get('info').role;
        const name = cookie.get('info').name;

        const navDropdownTitle = ( <span><NotificationsIcon size="sm"/></span> );

        if (role === 'user'){
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
                            <Navbar.Text> Signed in as: <Link to="/UserProfile">{name}</Link></Navbar.Text>
                            <Button variant="outline-secondary" href="/LoginPage">Log out</Button>
                        </Navbar.Collapse>
                    </Navbar>
                    </div>
                </div>
            )
        } 
        else if (role === 'admin') {
            return (
                <div className="conatiner">
                <div id="apFrameForAdmin">
                    <Navbar fixed="top" expand="md" bg="dark" variant="dark">
                    <Navbar.Brand>Tidsbanken</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/"> Home</Nav.Link>
                        <NavDropdown title={navDropdownTitle}>

                        </NavDropdown>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text> Signed in as: <Link to="/UserProfile">{name}</Link></Navbar.Text>
                        <Nav>
                            <Nav.Link href="/ApplicationSettings"> <SettingsIcon/></Nav.Link>
                        </Nav>
                        
                    </Navbar.Collapse>
                    </Navbar>

                </div>
            </div>
            ) 
        } else {
            return (
                <div>
                    Role not given correctly in cookie
                </div>
               
            )
        }
    }*/
}

export default ApplicationFrame;
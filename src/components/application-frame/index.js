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

    constructor(props){
        //const cookie = new Cookies();
        super(props)
        this.state = {
            //name : cookie.get('info').name
            name : 'Noname'
        }
    }


    render(){


        //const cookie = new Cookies();

        //const role = cookie.get('info').role;
        const role = 'user';
        //const name = cookie.get('info').name;

        const navDropdownTitle = ( <span><NotificationsIcon size="sm"/></span> );
        const settingsDropdownTitle = (<span><SettingsIcon/></span>);

        if (role === 'user'){
            return(
                <div className="container">
                    <div id="apFrameForUsers">
                    <Navbar fixed="top" expand="md" bg="dark" variant="dark">
                        <Navbar.Brand>Tidsbanken</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link><Link to="/">Home</Link></Nav.Link>
                            <Nav.Link><Link to="/VacationRequests">Vacation requests</Link></Nav.Link>
                            <NavDropdown title={navDropdownTitle}>
                                <NavDropdown.Item>Notification 1</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text> Signed in as: <Link to="/profile">Username</Link></Navbar.Text>
                            <Nav>
                                <Nav.Link></Nav.Link><Button variant="outline-info" size="sm" onClick={this.props.parentProps.onLogout}>Logout</Button>
                            </Nav>                            
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
                        <Nav.Link><Link to="/">Home</Link></Nav.Link>
                        <NavDropdown title={navDropdownTitle}>
                            <NavDropdown.Item>Notification 1</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text> Signed in as: <Link to="/profile">Username</Link></Navbar.Text>
                        <Nav>
                            <NavDropdown title={settingsDropdownTitle}>
                                <NavDropdown.Item href="/Users">Users</NavDropdown.Item>
                                <NavDropdown.Item href="/VacationSettings">Vacations</NavDropdown.Item>
                            </NavDropdown>
                            {/*<Nav.Link href="/ApplicationSettings"> <SettingsIcon/></Nav.Link>}*/}
                        </Nav>
                        <Navbar.Text><i>Admin</i></Navbar.Text>
                        <Nav>
                            <Nav.Link></Nav.Link><Button variant="outline-info" size="sm" onClick={this.props.parentProps.onLogout}>Logout</Button>
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
    }
}

export default ApplicationFrame;
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './ApplicationFrame.css';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import Notifications from '../../components/notifications/index';


//Navigation bar that renders differently depending on if currentUser is admin or not
//For users: Contains home-button, menu-button to navigate to own requests, notifications dropdown list, 
//link to user profile and logout button
//For admin: Contains home-button, menu-button to navigate to own and other users requests, notifications 
//dropdown list, settings menu, admin indicator and logout button
class ApplicationFrame extends Component {

    render() {

        var icon = (<span><img src="https://www.flaticon.com/premium-icon/icons/svg/2667/2667668.svg" height="33" width="33" alt="icon here" /></span>)

        const username = this.props.parentProps.currentUser.name;

        const settingsDropdownTitle = (<span><SettingsIcon /></span>);
        const menuDropdownTitle = (<span><MenuIcon /></span>)

        if (!this.props.parentProps.currentUser.admin) {
            return (
                <div className="container">
                    <div id="apFrameForUsers">
                        <Navbar fixed="top" expand="sm" bg="dark" variant="dark">
                            <Navbar.Brand><Link to="/">{icon}</Link></Navbar.Brand>
                            <Nav className="mr-auto">
                                <NavDropdown title={menuDropdownTitle}>
                                    <NavDropdown.Item>
                                        <Nav.Link><Link to="/">Home</Link></Nav.Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Nav.Link><Link to="/VacationRequests">My vacation requests</Link></Nav.Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Notifications currentUser={this.props.parentProps.currentUser}/>
                            </Nav>
                            <Navbar.Text> Signed in as: <Link to="/MyProfile">{username}</Link></Navbar.Text>
                            <Nav>
                                <Nav.Link></Nav.Link><Button variant="outline-info" size="sm" onClick={this.props.parentProps.onLogout}>Logout</Button>
                            </Nav>
                        </Navbar>
                    </div>
                </div>
            )
        }
        else if (this.props.parentProps.currentUser.admin) {
            return (
                <div className="conatiner">
                    <div id="apFrameForAdmin">
                        <Navbar fixed="top" expand="sm" bg="dark" variant="dark">
                            <Navbar.Brand><Link to="/">{icon}</Link></Navbar.Brand>
                            <Nav className="mr-auto">
                                <NavDropdown title={menuDropdownTitle}>
                                    <NavDropdown.Item>
                                        <Nav.Link><Link to="/">Home</Link></Nav.Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Nav.Link><Link to="/VacationRequests">My vacation requests</Link></Nav.Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Nav.Link><Link to="/AllVacationRequests">All vacation requests</Link></Nav.Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Notifications currentUser={this.props.parentProps.currentUser}/>
                            </Nav>
                            <Navbar.Text> Signed in as: <Link to="/MyProfile">{username}</Link></Navbar.Text>
                            <Nav>
                                <NavDropdown title={settingsDropdownTitle}>
                                    <NavDropdown.Item><Link to="/Users">Users</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to="/VacationSettings">Vacations</Link></NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Navbar.Text><i>Admin</i></Navbar.Text>

                            <Nav>
                                <Nav.Link></Nav.Link><Button variant="outline-info" size="sm" onClick={this.props.parentProps.onLogout}>Logout</Button>
                            </Nav>
                        </Navbar>

                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    Role not given correctly
                </div>

            )
        }
    }
}

export default ApplicationFrame;
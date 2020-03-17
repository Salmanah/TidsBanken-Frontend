import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {MDBBtn} from 'mdbreact';
import AvailableActions from '../available-actions/index';
import Notifications from '../notifications/index';
import CurrentUser from '../current-user/index';
import './ApplicationFrame.css';
import {Navbar, Nav, NavDropdown, NavbarBrand, Button, Alert} from 'react-bootstrap';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import Cookies from 'universal-cookie';
import {getCurrentUser} from '../../utils/APIUtils';
import MenuIcon from '@material-ui/icons/Menu';


class ApplicationFrame extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){

    }


    render(){

        var icon = (<span><img src="https://www.flaticon.com/premium-icon/icons/svg/2667/2667668.svg" height="33" width="33" alt="icon here" /></span>)

        console.log("props in application frame:")
        console.log(this.props)

        const username = this.props.parentProps.currentUser.name;

        const navDropdownTitle = ( <span><NotificationsIcon size="sm"/></span> );
        const settingsDropdownTitle = (<span><SettingsIcon/></span>);
        const menuDropdownTitle = (<span><MenuIcon/></span>)

        if (!this.props.parentProps.currentUser.admin){
            return(
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
                                    <Nav.Link><Link to="/VacationRequests">Vacation requests</Link></Nav.Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title={navDropdownTitle}>
                                <NavDropdown.Item>Notification 1</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {/*<Navbar.Collapse className="justify-content-end">*/}                            
                        <Navbar.Text> Signed in as: <Link to="/UserProfile">{username}</Link></Navbar.Text>
                            <Nav>
                                <Nav.Link></Nav.Link><Button variant="outline-info" size="sm" onClick={this.props.parentProps.onLogout}>Logout</Button>
                            </Nav>                      
                        {/*</Navbar.Collapse>*/}
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
                        </NavDropdown>
                        <NavDropdown title={navDropdownTitle}>
                            <NavDropdown.Item>Notification 1</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {/*<Navbar.Collapse className="justify-content-end">*/}
                    <Navbar.Text> Signed in as: <Link to="/UserProfile">{username}</Link></Navbar.Text>
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
                    {/*</Navbar.Collapse>*/}
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
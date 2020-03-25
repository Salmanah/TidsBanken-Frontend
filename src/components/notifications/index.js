import React, { Component, useEffect, useState } from "react";
import {Link, NavLink} from 'react-router-dom';
import { Dropdown, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getNotificationForAdmin, getNotificationForCurrentUser } from "../../utils/APIUtils";


//skal returnere 
const Notifications = (props) => {

    console.log("props i notifications")
    console.log(props)

    const navDropdownTitle = (<span><NotificationsIcon size="sm" /></span>);

    const [nots, setNots] = useState([])

    useEffect(()=>{
        if (props.currentUser.admin){
            getNotificationForAdmin()
            .then(resp=>{
                console.log(resp)
                setNots(resp)
            }).catch(err => {console.error(err)})
        }else{
            getNotificationForCurrentUser()
            .then(resp=>{
                console.log(resp)
                setNots(resp)
            }).catch(err => {console.error(err)})
        }
    },[])

    return(
        <div>
            <NavDropdown title={navDropdownTitle}>
                {nots.map(element => {
                    return(
                        <NavDropdown.Item>{element.type}</NavDropdown.Item>
                    )
                })}
                
            </NavDropdown>
        </div>
    )
}
/*
class Notifications extends Component{
    render(){

        const navDropdownTitle = (<span><NotificationsIcon size="sm" /></span>);

        return(
            <div>
                    <NavDropdown title={navDropdownTitle}>
                        <NavDropdown.Item>Notification 12</NavDropdown.Item>
                    </NavDropdown>
                </div>
        )
    }
}*/

export default Notifications;
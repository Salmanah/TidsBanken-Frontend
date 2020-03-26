import React, { Component, useEffect, useState } from "react";
import {Link, NavLink} from 'react-router-dom';
import { Dropdown, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getNotificationForAdmin, getNotificationForCurrentUser } from "../../utils/APIUtils";
import Badge from '@material-ui/core/Badge';


//skal returnere 
const Notifications = (props) => {
    const [userId, setUserId] = useState(props.currentUser.id);
   
    const [nots, setNots] = useState([])

    const [notCount, setNotCount] = useState(localStorage.getItem(`notsCount${userId}`));
    const [notify, setNotify] = useState(false);

    

    useEffect(()=>{

        if (props.currentUser.admin){
            getNotificationForAdmin()
            .then(resp=>{
                console.log(resp)
                setNots(resp)
                localStorage.setItem(`notsCount${userId}`, resp.length)

                console.log(notCount)
                console.log(resp.length)

                if (notCount < resp.length){
                    setNotify(true);
                } 
            }).catch(err => {
                console.error(err)
                let list = [];
                list.push("No notifications yet");
                setNots(list);
            })
        }else{
            getNotificationForCurrentUser()
            .then(resp=>{
                setNots(resp)
                localStorage.setItem(`notsCount${userId}`, resp.length)

                console.log(notCount)
                console.log(resp.length)

                if (notCount < resp.length){
                    setNotify(true);
                } 
            }).catch(err => {
                console.error(err);
                let list = [];
                list.push("No notifications yet");
                setNots(list);
            })
        }
    },[])


    function handleSeen(){
        setNotify(false);
    }

    const navDropdownTitle = (<span><NotificationsIcon size="sm" /></span>);
    const navDropdownTitleBadge = (<span><Badge variant="dot" color="error"><NotificationsIcon size="sm" /></Badge></span>);

    return(
        <div>
            {notify ? 
                <NavDropdown onClick={handleSeen} title={navDropdownTitleBadge}> 
                {nots.slice(0).reverse().map((element, index) => {
                    if (index < 5){
                        if (element === "No notifications yet"){
                            return(<NavDropdown.Item><Link to="/Notifications">{element}</Link></NavDropdown.Item>)
                        } else{
                            return(<NavDropdown.Item><Link to="/Notifications">{element.datetimestamp} {element.type}</Link></NavDropdown.Item>)
                        }
                    }
                })}
                
            </NavDropdown>
                : <NavDropdown title={navDropdownTitle}> 
                {nots.slice(0).reverse().map((element, index) => {
                    if (index < 5){
                        if (element === "No notifications yet"){
                            return(<NavDropdown.Item><Link to="/Notifications">{element}</Link></NavDropdown.Item>)
                        } else{
                            return(<NavDropdown.Item><Link to="/Notifications">{element.datetimestamp} {element.type}</Link></NavDropdown.Item>)
                        }
                    }
                })}
                
            </NavDropdown>}
                
                
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
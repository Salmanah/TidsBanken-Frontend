import React, { useEffect, useState, useRef } from "react";
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
    //localStorage.setItem(`notsCount${userId}`, 0); Bruk når databasen resettes
    const [notCount, setNotCount] = useState(localStorage.getItem(`notsCount${userId}`));
    const [notify, setNotify] = useState(false);


    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }

    let [count, setCount] = useState(0);

    function action(resp){
        console.log(resp.length)
        setNots(resp)
        localStorage.setItem(`notsCount${userId}`, resp.length)

        if (notCount < resp.length){
            setNotify(true);
        } 

    }

    useInterval(() => {
    // Your custom logic here

    console.log(localStorage.getItem(`notsCount${userId}`))
    console.log(notCount)

    if (props.currentUser.admin){

        console.log("getforadmin")
        getNotificationForAdmin()
        .then(resp=>{
            action(resp)
        }).catch(err => {
            console.error(err)
            let list = [];
            list.push("No notifications yet");
            setNots(list);
        })
    }else{
        console.log("getforuser")

        getNotificationForCurrentUser()
        .then(resp=>{
            action(resp)
        }).catch(err => {
            console.error(err);
            let list = [];
            list.push("No notifications yet");
            setNots(list);
        })
    }

    }, 15000);

    useEffect(()=>{

        console.log(localStorage.getItem(`notsCount${userId}`))
        console.log(notCount)

        if (props.currentUser.admin){
            console.log("getforadmin")
            getNotificationForAdmin()
            .then(resp=>{
                action(resp)
            }).catch(err => {
                console.error(err)
                let list = [];
                list.push("No notifications yet");
                setNots(list);
            })
        }else{
            console.log("getforuser")
            getNotificationForCurrentUser()
            .then(resp=>{
                action(resp)
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
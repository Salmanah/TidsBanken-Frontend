import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { NavDropdown } from "react-bootstrap";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getNotificationForAdmin, getNotificationForCurrentUser } from "../../utils/APIUtils";
import Badge from '@material-ui/core/Badge';


//Asks database for list of notifications every 15 seconds. Stores the number of notifcations in localstorage
//and uses this value to check if the user should be notified about changes (give notification). The user is 
//notified about changes if the number of notifications in the most recent recieved list of notifications is 
//different from the value stored in memory. 
//The component is rendered as a clickable notification icon + red badge if norify is true. If clicked, the five
//last element of the notification list is displayed in a dropdown list. Each list item is clickable and
//redirects to /Notifications
const Notifications = (props) => {

    const [userId, setUserId] = useState(props.currentUser.id);
   
    const [nots, setNots] = useState([])
    //localStorage.setItem(`notsCount${userId}`, 0); Bruk når databasen resettes
    const [notCount, setNotCount] = useState(localStorage.getItem(`notsCount${userId}`));
    const [notify, setNotify] = useState(false);

    //borrowed from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
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

    //setting the local storage with notification count and sets notify true if new notifications have appeard since
    //last time. Also set notifications list equal to the fetch response.
    function action(resp){
        setNots(resp)
        localStorage.setItem(`notsCount${userId}`, resp.length)
        if (notCount != resp.length){
            setNotify(true);
            setNotCount(resp.length)
        } 
    }

    //fetching list of notifications from backend
    function gettingNotifications(){
        if (props.currentUser.admin){
            getNotificationForAdmin()
            .then(resp=>{
                action(resp);
            }).catch(err => {
                console.error(err);
            })
        }else{
            getNotificationForCurrentUser()
            .then(resp=>{
                action(resp);
            }).catch(err => {
                console.error(err);
            })
        }
    }
    
    //fetch notifications at page refresh
    useEffect(()=>{
        gettingNotifications()
    },[])

    //fetch notifications every 15 second after page refresh
    useInterval(() => {
        gettingNotifications()
    }, 15000);

    //removes badge from notification icon
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

export default Notifications;
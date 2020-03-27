import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { NavDropdown } from "react-bootstrap";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getNotificationForAdmin, getNotificationForCurrentUser } from "../../utils/APIUtils";
import Badge from '@material-ui/core/Badge';


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


    function action(resp){
        setNots(resp)
        localStorage.setItem(`notsCount${userId}`, resp.length)
        

        if (notCount != resp.length){
            setNotify(true);
            setNotCount(resp.length)
        } 
    }

    function gettingNotifications(){

        if (props.currentUser.admin){
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
    }
    
    useEffect(()=>{
            gettingNotifications()
        },[])

    useInterval(() => {
        gettingNotifications()

    }, 15000);

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
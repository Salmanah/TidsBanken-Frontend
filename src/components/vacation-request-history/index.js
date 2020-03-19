import React, {useEffect} from "react";
import {List, ListItemText, ListItem} from '@material-ui/core';
import { getUserRequestsById } from "../../utils/APIUtils";

//for admin
const VacationRequestHistory = (props) => {

    const userId = props.location.state.userId;
    const [requests, setRequests] = React.useState([]);

    useEffect(()=>{
        getUserRequestsById(userId).then(resp => {
            setRequests(resp);
        })
    }, [])

    if (props.currentUser.admin){
        return (
            <div>
                <p>Showing vacation requests of user with id: {userId}</p>
                <div>
                    <List>
                        {requests.map((element, index) => {
                            return (<ListItem>
                                <ListItemText>{element.title}</ListItemText>
                            </ListItem>)
                        })}
                    </List>

                </div>
            </div>
        )
    } else {
        return (
            <p>Not admin, access not granted</p>
        )
    }

    

}

export default VacationRequestHistory;
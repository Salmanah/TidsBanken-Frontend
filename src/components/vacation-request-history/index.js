import React, {useEffect} from "react";
import {List, ListItemText, ListItem, Divider} from '@material-ui/core';
import { getUserRequestsById } from "../../utils/APIUtils";
import {Spinner} from 'react-bootstrap';
import HistoryListItem from '../../components/history-list-item/index';

//for admin
const VacationRequestHistory = (props) => {

    const userId = props.location.state.user.id;
    const [requests, setRequests] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(()=>{
        getUserRequestsById(userId)
        .then(resp => {
            setRequests(resp);
            setLoading(false);
        })
        .catch(error => {console.error('Error:', error)})
    }, [])

    

    if (props.currentUser.admin){
        return (
            <div>
                <List>
                    <Divider/>
                    <ListItem>
                        <ListItemText>{props.location.state.user.name}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>ID : {props.location.state.user.id}</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>E-mail: {props.location.state.user.email}</ListItemText>
                    </ListItem>
                    <Divider/>
                </List>
                {loading ? (<Spinner animation="border"/>):(
                    <List>
                        {requests.map((element, index) => {
                            return (
                                <HistoryListItem element={element}/>
                            )
                        })}
                    </List>
                )}
            </div>
        )
    } else {
        return (
            <p>Not admin, access not granted</p>
        )
    }

    

}

export default VacationRequestHistory;
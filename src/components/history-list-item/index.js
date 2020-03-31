import React, {useState} from 'react';
import {ListItem, Collapse, ListItemText, ListItemIcon, Button, Divider} from '@material-ui/core';
import './historyListItem.css';

//Displays a request item together with css styled color indcated status. The list item can contain 
//a button that redirects to /ViewVacationRequest
const HistoryListItem = (props) => {

    function handleMoreInfoClick(event, currentRequest){
        props.parentProps.history.push({
            pathname : "/ViewVacationRequest",
            state : {
                request : currentRequest
            }
        })
    }

    const [status, setStatus] = useState(props.element.status[0].status);
  
    return(
        <div>
            <ListItem>
                <ListItemText>{props.element.title} 
                {status === "Pending" ? <div className="requestStatusPending">{status}</div>
                : ( <div>
                    {status === "Approved" ? <div className="requestStatusApproved">{status}</div> 
                    : (
                        <div>
                            {status === "Denied" ? <div className="requestStatusDenied">{status}</div>
                            : (<></>)}
                        </div>
                    )}
                </div>
                    
                )
                }
                </ListItemText>
                <Button edge="end" onClick={e => handleMoreInfoClick(e, props.element)}>More info</Button>
            </ListItem>
            <Divider/>
        </div>
    )

}

export default HistoryListItem;
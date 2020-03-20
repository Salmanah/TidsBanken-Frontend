import React from 'react';
import {ListItem, Collapse, ListItemText, ListItemIcon, Button, Divider} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import WifiIcon from '@material-ui/icons/Wifi';

const HistoryListItem = (props) => {

    function handleMoreInfoClick(event, currentRequest){
        props.parentProps.history.push({
            pathname : "/ViewVacationRequest",
            state : {
                request : currentRequest
            }
        })
    }



    return(
        <div>
            <ListItem>
                <ListItemText>{props.element.title}</ListItemText>
                <Button edge="end" onClick={e => handleMoreInfoClick(e, props.element)}>More info</Button>
                <Button edge="end" >Approve/deny</Button>
                <Button edge="end" >Add comment</Button>
            </ListItem>
            <Divider/>
        </div>
    )

}

export default HistoryListItem;
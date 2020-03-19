import React from 'react';
import {ListItem, Collapse, ListItemText, ListItemIcon, Button, Divider} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import WifiIcon from '@material-ui/icons/Wifi';

const HistoryListItem = (props) => {

    console.log(props)

    const [open, setOpen] = React.useState(false);


    function handleMoreInfoClick(){
        setOpen(!open);
    }

    return(
        <div>
            <ListItem button onClick={handleMoreInfoClick}>
                <ListItemText>{props.element.title}</ListItemText>
                <Button edge="end">More info</Button>
                    <Button edge="end" onClick={console.log("onclick checkout button")}>Approve/deny</Button>
                    <Button edge="end">Add comment</Button>
            </ListItem>
            <Divider/>
        </div>
    )

}

export default HistoryListItem;
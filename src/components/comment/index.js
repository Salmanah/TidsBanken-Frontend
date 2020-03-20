import React, {useEffect, useState} from 'react';
import {ListItem, ListItemText} from '@material-ui/core';

const Comment = (props) => {

    return(
        <ListItem>
            <ListItemText>{props.comment.message}</ListItemText>
        </ListItem>
    )
}

export default Comment;
import React, {useEffect, useState} from 'react';
import {ListItem, ListItemText, Divider} from '@material-ui/core';
import {Row, Col} from 'react-bootstrap';
import { Colorize } from '@material-ui/icons';
import './comment.css';

const Comment = (props) => {

    console.log("Comment component")
    console.log(props.comment)

    return(
        <div>
            <ListItem>
                <ListItemText className="itemAboutComment">
                    <Row>
                        <Col>By: {props.comment.user[0].name}</Col>
                        <Col className="commentTimestamp">{props.comment.datetimestamp}</Col>
                    </Row> 
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>
                    {props.comment.message}
                </ListItemText>
            </ListItem>
        </div>
        
    )
}

export default Comment;
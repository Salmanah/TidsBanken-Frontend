import React, {Component} from 'react';
import {ListItem, Divider} from '@material-ui/core';


class RequestListItem extends Component{

    constructor(props){
        super(props)
    }

    itemClicked(event){
        console.log("Clicked")
        this.props.parentProps.history.push({ 
            pathname: "/ViewVacationRequest",
            state: {
                id:1
            }
        });
    }

    render(){
        console.log(this.props.parentProps)
        return(
            <ListItem button onClick={e => this.itemClicked(e)}>
                Request title 1
            </ListItem>
        )
    }
}


export default RequestListItem;

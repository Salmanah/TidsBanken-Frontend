import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import {ListItem, ListItemText, List, Collapse} from '@material-ui/core';
import { ExpandMore, ExpandLess, withStyles } from '@material-ui/icons';
import './requestListItem.css';




class RequestListItem extends Component{

    constructor(props){
        super(props)
        this.state = {
            open : false
        }
    }

    handleMoreInfoClick(){
        this.setState({open : !this.state.open})
    }

    itemClicked(event, currentRequest){
        this.props.parentProps.history.push({ 
            pathname: "/ViewVacationRequest",
            state: {
                request: currentRequest
            }
        });
    }


    render(){
        return(
            <div>
                <ListItem button onClick={e => this.handleMoreInfoClick(e)}>
                    <ListItemText>{this.props.request.title}</ListItemText>
                    {this.state.open? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List>
                        <ListItem className="itemContent">
                            <ListItemText>Period: {this.props.request.period_start} to {this.props.request.period_end}</ListItemText>
                        </ListItem>
                        <ListItem className="itemContent">
                            <ListItemText>Status: {this.props.request.status[0].status}</ListItemText>
                        </ListItem>
                        <ListItem className="itemContent">
                            <Button size="sm" onClick={e=>this.itemClicked(e, this.props.request)}>Read more</Button>
                        </ListItem>
                    </List>
                </Collapse>


            </div>
            
        )
    }
}


export default RequestListItem;


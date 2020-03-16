import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import {ListItem, ListItemText, List, Collapse} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';


class RequestListItem extends Component{

    constructor(props){
        super(props)
        this.state = {
            open : false
        }
    }

    handleMoreInfoClick(){
        this.setState({open : !this.state.open})
        console.log(this.state.open)
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
        //console.log(this.props.parentProps)
        return(
            <div>
                <ListItem button onClick={e => this.handleMoreInfoClick(e)}>
                    <ListItemText>{this.props.title}</ListItemText>
                    {this.state.open? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List>
                        <ListItem>
                            <ListItemText>Period:</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Status:</ListItemText>
                        </ListItem>
                        <ListItem>
                            <Button size="sm" onClick={e=>this.itemClicked(e)}>Read more</Button>
                        </ListItem>
                    </List>
                </Collapse>


            </div>
            
        )
    }
}


export default RequestListItem;


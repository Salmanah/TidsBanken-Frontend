import React, { useState, useEffect } from 'react';
import { ListItem, ListItemText, List, Collapse, Button } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import './request-list-item.css';


const RequestListItem = (props) => {

    const [open, setOpen] = useState(false);


    function handleMoreInfoClick(){
        setOpen(!open);
    }

    function handleViewRequest(currentRequest){
        props.parentProps.history.push({
            pathname : "/ViewVacationRequest",
            state: {
                request : currentRequest
            }
        })
    }
    
    if (props.admin) {
        return(
            <div>
                <ListItem button onClick={handleMoreInfoClick}>
                <ListItemText>{props.request.title} 
                {props.request.status[0].status === "Pending" ? <div className="requestStatusPending">{props.request.status[0].status}</div>
                : ( <div>
                    {props.request.status[0].status === "Approved" ? <div className="requestStatusApproved">{props.request.status[0].status}</div> 
                    : (
                        <div>
                            {props.request.status[0].status === "Denied" ? <div className="requestStatusDenied">{props.request.status[0].status}</div>
                            : (<></>)}
                        </div>
                    )}
                </div>
                    
                )
                }
                
                    
                </ListItemText>{open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <List>
                    <ListItem className="itemContent">
                        <ListItemText>Request ID: {props.request.request_id}</ListItemText>
                    </ListItem>
                    <ListItem className="itemContent">
                        <ListItemText>Owner: ID {props.request.owner[0].id} - {props.request.owner[0].name}</ListItemText>
                    </ListItem>
                    <ListItem className="itemContent">
                        <ListItemText>Period: {props.request.period_start} to {props.request.period_end}</ListItemText>
                    </ListItem>
                    <ListItem className="itemContent">
                        <Button onClick={e => handleViewRequest(props.request)}>Read more</Button>
                    </ListItem>
                </List>
                </Collapse>
            </div>
        )
    } else{
         return(
            <div>
                <ListItem button onClick={handleMoreInfoClick}>
                    <ListItemText>{props.request.title}
                    {props.request.status[0].status === "Pending" ? <div className="requestStatusPending">{props.request.status[0].status}</div>
                : ( <div>
                    {props.request.status[0].status === "Approved" ? <div className="requestStatusApproved">{props.request.status[0].status}</div> 
                    : (
                        <div>
                            {props.request.status[0].status === "Denied" ? <div className="requestStatusDenied">{props.request.status[0].status}</div>
                            : (<></>)}
                        </div>
                    )}
                </div>
                    
                )
                }</ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List>
                        <ListItem className="itemContent">
                            <ListItemText>Period: {props.request.period_start} to {props.request.period_end}</ListItemText>
                        </ListItem>
                        <ListItem className="itemContent">
                            <ListItemText>Status: {props.request.status[0].status}</ListItemText>
                        </ListItem>
                        <ListItem className="itemContent">
                            <Button size="sm" onClick={e => handleViewRequest(props.request)}>Read more</Button>
                        </ListItem>
                    </List>
                </Collapse>
            </div>
    )
    }

   
}




/*class RequestListItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleMoreInfoClick() {
        this.setState({ open: !this.state.open })
    }

    itemClicked(event, currentRequest) {
        this.props.parentProps.history.push({
            pathname: "/ViewVacationRequest",
            state: {
                request: currentRequest
            }
        });
    }


    render() {
        console.log(this.props)
        if (this.props.admin){
            return (
                <div>
                    <ListItem button onClick={e => this.handleMoreInfoClick(e)}>
                        <ListItemText>{this.props.request.title} <div>{this.props.request.status[0].status}</div></ListItemText>
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List>
                        <ListItem>

                        </ListItem>
                        <ListItem className="itemContent">
                            <ListItemText>Request ID: {this.props.request.request_id}</ListItemText>
                        </ListItem>
                        <ListItem className="itemContent">
                            <ListItemText>Owner: ID {this.props.request.owner[0].id} - {this.props.request.owner[0].name}</ListItemText>
                        </ListItem>
                        <ListItem className="itemContent">
                            <ListItemText>Period: {this.props.request.period_start} to {this.props.request.period_end}</ListItemText>
                        </ListItem>
                        <ListItem className="itemContent">
                            <Button>Read more</Button>
                        </ListItem>
                    </List>
                </Collapse>
                </div>
            )
        } else{
            return (
            <div>
                <ListItem button onClick={e => this.handleMoreInfoClick(e)}>
                    <ListItemText>{this.props.request.title}</ListItemText>
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
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
                            <Button size="sm" onClick={e => this.itemClicked(e, this.props.request)}>Read more</Button>
                        </ListItem>
                    </List>
                </Collapse>


            </div>

        )
        }
        
    }
}
*/

export default RequestListItem;


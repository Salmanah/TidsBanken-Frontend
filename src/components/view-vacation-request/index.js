import React, { useState } from "react";
import './viewVacationRequest.css';
import { List, ListItem, Divider, Collapse, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import { Container, Col, Row, Button, Modal, Alert } from 'react-bootstrap';
import { adminEditVacationRequest, deleteVacationRequest } from "../../utils/APIUtils";
import CommentList from '../../components/comment-list/index';


const ViewVacationRequest = (props) => {

    console.log(props)

    const [vacationRequest, setVacationRequest] = useState(props.location.state.request);
    const [status, setStatus] = useState(vacationRequest.status[0].status);
    const [commentRevealed, setCommentRevealed] = useState(false);


    function handleViewComments(event) {
        setCommentRevealed(!commentRevealed)
    }

    function handleChangeStatus(e, status) {
        adminEditVacationRequest(vacationRequest.request_id, status).then(resp => {
            console.log(resp)
        }).catch(err => { console.log(err) })
        setStatus(status)
    }

    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

    function handleOpen(){
        setOpenConfirmDelete(true);
    }
    function handleClose(){
        setOpenConfirmDelete(false);
    }

    function handleDeleteRequest(){
        console.log("delete request")
        deleteVacationRequest(vacationRequest.request_id)
        .then(resp=>{
            console.log(resp)
            alert("The request has been deleted")
            props.history.push("/")
        }).catch(err => {console.error(err)});
        setOpenConfirmDelete(false);
    }

    return (
        <div>
            <h1>Vacation request</h1>
            {props.currentUser.admin && status === "Pending" && !(props.currentUser.id === vacationRequest.owner[0].id ) ? (
                <Container>
                    <Row>
                        <Col>
                            <Button variant="success" onClick={e => handleChangeStatus(e, "Approved")}>Approve</Button>
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={e => handleChangeStatus(e, "Denied")}>Deny</Button>
                        </Col>
                        <Col>
                            <Button variant="outline-danger" onClick={handleOpen}>Delete</Button>
                            <Modal show={openConfirmDelete} onHide={handleClose}>
                                <Modal.Header>
                                <Modal.Title>Warning</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you want to delete this request?</Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleDeleteRequest}>
                                    Yes
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    No
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            )
                : (
                    <div></div>
                )}

            <List>
                <ListItem>
                    <ListItemText>Title: {vacationRequest.title}</ListItemText> <EditIcon />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText>Owner: {vacationRequest.owner[0].name}</ListItemText>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText>Period: {vacationRequest.period_start} to {vacationRequest.period_end}</ListItemText> <EditIcon />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText> Status: {status}</ListItemText>
                </ListItem>
                <Divider />
                { //har ikke testet om denne faktisk funker hvis man ikke er admin eller owner
                    props.currentUser.admin || props.currentUser.id === vacationRequest.owner[0].id ? (
                        (
                            <div>
                                <ListItem button onClick={e => handleViewComments(e)} >
                                    <ListItemText>Comments</ListItemText>
                                    {commentRevealed ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={commentRevealed} timeout="auto" unmountOnExit>
                                    <CommentList parentProps={props} />
                                </Collapse>
                            </div>
                        )
                    ) : (
                            <div>
                            </div>)
                }

            </List>

        </div>
    )
}

export default ViewVacationRequest;


/*class ViewVacationRequest extends Component {

    constructor(props) {
        super(props)
        this.state = {
            commentRevealed: false,
            requestId : props.location.state.requestId
        }
    }

    handleViewComments(event) {
        this.setState({ commentRevealed: !this.state.commentRevealed })
    }



    render() {

        console.log("props i viewvacationrequest")
        console.log(this.props.location.state.requestId)
        console.log(this.state.requestId)

        return (
            <div>
                <div className="vacationRequestContent">
                    <h1>Vacation request</h1>
                    <List>
                        <ListItem>
                            <ListItemText>Title:</ListItemText> <EditIcon />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText>Owner:</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText>Period:</ListItemText> <EditIcon />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText> Status:</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={e => this.handleViewComments(e)} >
                            <ListItemText>Comments</ListItemText>
                            {this.state.commentRevealed ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.commentRevealed} timeout="auto" unmountOnExit>
                            <List>
                                <ListItem>
                                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
                            </ListItem>
                            </List>
                        </Collapse>
                    </List>



                </div>

            </div>

        )
    }
}

export default ViewVacationRequest;

*/




/*

class ViewVacationRequest extends Component{

    constructor(props){
        super(props);
        this.state = {
            owner : "No owner",
            title : "No title",
            startDate : "No start date",
            endDate : "No end date",
            comment : "No comment",
            status : "No status"
        }
    }



    componentDidMount(){
        let url = "";
       /* if (url === ""){
            console.log("not fetching");
        } else {
            //GET /request/:user_id
            fetch(url)
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp);
                this.setState({
                    owner : resp.owner_id,
                    title: resp.title,
                    startDate : resp.period_start,
                    endDate : resp.period_end
                });
                console.log(resp.name)

                //GET /request/:request_id/comment
                var comments = [];
                fetch(url)
                .then(resp => resp.json())
                .then(resp => {
                    console.log(resp);
                    resp.forEach(message => {
                        comments.push("message")
                    });
                    this.setState({
                        comment: comments
                    })
                }).catch(err => console.log(err))

                //GET /request/:status_id/status
                fetch(url)
                .then(resp => resp.json())
                .then(resp => {
                    console.log(resp);
                    this.setState({
                        status: resp.status
                    })
                }).catch(err => console.log(err))

            }).catch(err => console.log(err))
        }
    }

    render() {
        console.log("RENDERING VIEWVACATIONREQUEST")
        return (
        <div>
            <h1>View vacation request</h1>
            <p>Should show the full detail pertaining to a single vacation request.</p>
            <div>
                <p>{this.state.owner}</p>
                <p>{this.state.title}</p>
                <p>{this.state.startDate}</p>
                <p>{this.state.endDate}</p>
                <p>{this.state.comment}</p>
                <p>{this.state.status}</p>
            </div>
        </div>)

    }
*/
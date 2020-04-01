import React, { useState } from "react";
import './viewVacationRequest.css';
import { List, ListItem, Divider, Collapse, ListItemText, Button } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Container, Col, Row, Modal, Alert } from 'react-bootstrap';
import { adminEditVacationRequest, deleteVacationRequest, deleteVacationRequestAdmin } from "../../utils/APIUtils";
import CommentList from '../../components/comment-list/index';


//Gets a vacation request via props and displays information about the request.
//Comment section is revealed when comments list item is clicked.
//Admin have the options of approving, denying or deleting the request. Owner can
//only delete the request. After the request have been approved or denied, the request
//cannot be deleted anymore.
const ViewVacationRequest = (props) => {

    const [vacationRequest, setVacationRequest] = useState(props.location.state.request);
    const [status, setStatus] = useState(vacationRequest.status[0].status);
    const [commentRevealed, setCommentRevealed] = useState(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);


    function handleViewComments(event) {
        setCommentRevealed(!commentRevealed)
    }

    function handleChangeStatus(e, status) {
        adminEditVacationRequest(vacationRequest.request_id, status).then(resp => {
            console.log(resp)
        }).catch(err => { console.log(err) })
        setStatus(status)
    }

    console.log(vacationRequest)
    

    function handleOpen() {
        setOpenConfirmDelete(true);
    }
    function handleClose() {
        setOpenConfirmDelete(false);
    }

    function handleDeleteRequest() {
        if (props.currentUser.admin) {
            console.log("deleting request " + vacationRequest.request_id + " as admin");
            deleteVacationRequestAdmin(vacationRequest.request_id)
                .then(resp => {console.log("delete resp:");console.log(resp)})
                .catch(err => { console.error(err) });
            props.history.push({
                pathname : "/VacationRequestHistory",
                state : {
                    user : vacationRequest.owner[0]
                }
            })
        } else { console.log("deleting request " + vacationRequest.request_id + " as user");

            deleteVacationRequest(vacationRequest.request_id)
                .then(resp => {console.log("delete resp:");console.log(resp)})
                .catch(err => { console.error(err) });
                props.history.push({
                    pathname : "/VacationRequestHistory",
                    state : {
                        user : props.currentUser
                    }
                })
        }
        setOpenConfirmDelete(false);
        //props.history.push("/")
    }

    function handleViewOwnerProfile() {
        props.history.push({
            pathname: "/UserProfile",
            userId: vacationRequest.owner[0].id
        })
    }

    if (status === "Pending") {
        return (<Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <div>
                        <h1>Vacation request</h1>
                        {props.currentUser.admin && !(props.currentUser.id === vacationRequest.owner[0].id) ? (
                            <Container>
                                <Row>
                                    <Col>
                                        <Button variant="outlined" color="primary" size="large" onClick={e => handleChangeStatus(e, "Approved")}>Approve</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outlined" color="secondary" size="large" onClick={e => handleChangeStatus(e, "Denied")}>Deny</Button>
                                    </Col>
                                    <Col>
                                        <Button color="secondary" size="large" onClick={handleOpen}>Delete</Button>
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
                                <div><Button color="secondary" size="large" onClick={handleOpen}>Delete</Button>
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
                                    </Modal></div>
                            )}

                        <List>
                            <ListItem>
                                <ListItemText>Title: {vacationRequest.title}</ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText>Owner: {vacationRequest.owner[0].name}</ListItemText>
                                {props.currentUser.admin ?
                                    <Button onClick={handleViewOwnerProfile}>View profile</Button>
                                    : <></>}
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText>Period: {vacationRequest.period_start} to {vacationRequest.period_end}</ListItemText>
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
                </Col>
            </Row>
        </Container>)
    } else {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <div>
                            <h1>Vacation request</h1>
                            <List>
                                <ListItem>
                                    <ListItemText>Title: {vacationRequest.title}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText>Owner: {vacationRequest.owner[0].name}</ListItemText>
                                    {props.currentUser.admin ?
                                        <Button onClick={handleViewOwnerProfile}>View profile</Button>
                                        : <></>}
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText>Period: {vacationRequest.period_start} to {vacationRequest.period_end}</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText> Status: {status}</ListItemText>
                                </ListItem>
                                <Divider />
                                { 
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
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default ViewVacationRequest;



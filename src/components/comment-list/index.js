import React, {useState, useEffect} from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';
import Comment from '../../components/comment/index';
import {Modal, Button, Form} from 'react-bootstrap';
import { getAllCommentsByVacationRequestIDAsAdmin, getAllCommentsByVacationRequestID, createCommentForVacationRequest, getVacationRequestByID, createCommentForVacationRequestAsAdmin, getVacationRequestByIDasAdmin } from "../../utils/APIUtils";


const CommentList = (props) => {


    const [vacationRequest, setVacationRequest] = useState(props.parentProps.location.state.request);
    const [writeComment, setWriteComment] = useState(false);
    const [comment, addComment] = useState(null)

    const handleShowWriteComment = () => setWriteComment(true);
    const handleCloseWriteComment = () => setWriteComment(false);
    const [commentList, setCommentList] = useState([]);

    function handleInputChange(event){
        addComment(event.target.value);
    }



    const [response, setResponse] = useState(null);

    function handleAddComment(){

        if (props.parentProps.currentUser.admin) {
            createCommentForVacationRequestAsAdmin(vacationRequest.request_id, comment)
            .then(resp => {
                setResponse(resp);
            }).catch(err => {console.error(err)})
        } else {
            createCommentForVacationRequest(vacationRequest.request_id, comment)
            .then(resp => {
                setResponse(resp);
            }).catch(err => {console.error(err)})
        }
        setWriteComment(false);        
    }

    useEffect(()=>{
        if (props.parentProps.currentUser.admin) {
            getAllCommentsByVacationRequestIDAsAdmin(vacationRequest.request_id)
            .then( resp => {
                setCommentList(resp)
            }).catch(err => {console.error(err)})
        } else {
            getAllCommentsByVacationRequestID(vacationRequest.request_id)
            .then(resp => {
                setCommentList(resp)
            }).catch(err => {console.error(err)})
        }
    },[response])



    return(
        <List>
            <ListItem>
                <ListItemText><Button onClick={handleShowWriteComment}>Add comment</Button>
                </ListItemText>
                <Modal show={writeComment} onHide={handleCloseWriteComment}>
                    <Modal.Header>
                        <Modal.Title>Write comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlTextArea1">
                                <Form.Control onChange={e => handleInputChange(e)} as="textarea" rows="3"/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleAddComment}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </ListItem>
            {commentList.slice(0).reverse().map((c,index)=>{
                return( <Comment comment={c}/> )
            })}
        </List>
    )
}

export default CommentList;
import React, {useState, useEffect} from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';
import Comment from '../../components/comment/index';
import {Modal, Button, Form} from 'react-bootstrap';
import { adminEditVacationRequest, createCommentForVacationRequestAsAdmin, getVacationRequestByIDasAdmin } from "../../utils/APIUtils";


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

    function handleAddCommentAsAdmin(){
        createCommentForVacationRequestAsAdmin(vacationRequest.request_id, comment)
        .then(resp => {
            setResponse(resp);
        }).catch(err => {console.error(err)})
        setWriteComment(false);
    }

    useEffect(()=>{
        getVacationRequestByIDasAdmin(vacationRequest.request_id)
        .then(resp=>{
            setVacationRequest(resp)
        }).catch(err => {console.error(err)})
    },[response])

    useEffect(()=>{
        setCommentList(vacationRequest.comment)
    },[vacationRequest])




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
                        <Button onClick={handleAddCommentAsAdmin}>Add</Button>
                    </Modal.Footer>
                </Modal>
            </ListItem>
            {commentList.map((c,index)=>{
                return(
                    <ListItem>
                    {c.message}
                </ListItem>
                )
                
            })}
        </List>
    )
}

export default CommentList;
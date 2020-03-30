import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Comment from '../../components/comment/index';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllCommentsByVacationRequestIDAsAdmin, getAllCommentsByVacationRequestID, createCommentForVacationRequest, getVacationRequestByID, createCommentForVacationRequestAsAdmin, getVacationRequestByIDasAdmin } from "../../utils/APIUtils";


const CommentList = (props) => {


    const [vacationRequest] = useState(props.parentProps.location.state.request);
    const [writeComment, setWriteComment] = useState(false);
    const [comment, setComment] = useState(null)
    const [disabled, setDisabled] = useState(true)

    const handleShowWriteComment = () => setWriteComment(true);
    const handleCloseWriteComment = () => setWriteComment(false);
    const [commentList, setCommentList] = useState([]);

    function handleInputChange(e) {
        let input = document.getElementById(e.target.name);

        let pattern = patternForHTMLtags()
        if (pattern.test(input.value) || input.value === "") {
            setDisabled(true)

        } else {
            setComment(e.target.value);
            setDisabled(false)
        }
    }

    function patternForHTMLtags() {
        // double spaces and opening and closing tags
        return /( ){2}|<(.|\n)*?>/g;
    }



    const [response, setResponse] = useState(null);

    function handleAddComment(e) {
        e.preventDefault()

        if (props.parentProps.currentUser.admin) {
            createCommentForVacationRequestAsAdmin(vacationRequest.request_id, comment)
                .then(resp => {
                    setResponse(resp);
                }).catch(err => { console.error(err) })
        } else {
            createCommentForVacationRequest(vacationRequest.request_id, comment)
                .then(resp => {
                    setResponse(resp);
                }).catch(err => { console.error(err) })
        }
        setWriteComment(false);
    }

    useEffect(() => {
        if (props.parentProps.currentUser.admin) {
            getAllCommentsByVacationRequestIDAsAdmin(vacationRequest.request_id)
                .then(resp => {
                    setCommentList(resp)
                }).catch(err => { console.error(err) })
        } else {
            getAllCommentsByVacationRequestID(vacationRequest.request_id)
                .then(resp => {
                    setCommentList(resp)
                }).catch(err => { console.error(err) })
        }
    }, [response])



    return (
        <List>
            <ListItem>
                <ListItemText><Button onClick={handleShowWriteComment}>Add comment</Button>
                </ListItemText>
                <Modal show={writeComment} onHide={handleCloseWriteComment}>
                    <Form onSubmit={handleAddComment}>>
                    <Modal.Header>
                            <Modal.Title>Write comment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="exampleForm.ControlTextArea1">
                                <Form.Control id="comment" name="comment" onChange={e => handleInputChange(e)} as="textarea" rows="3" required />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <input type="submit" className="btn btn-primary" disabled={disabled} />
                        </Modal.Footer>
                    </Form>
                </Modal>
            </ListItem>
            {commentList.slice(0).reverse().map((c, index) => {
                return (
                    c.message !== "" ? <Comment comment={c} /> : null
                )

            })}
        </List>
    )
}

export default CommentList;
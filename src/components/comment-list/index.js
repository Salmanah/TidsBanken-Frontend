import React, {useState, useEffect} from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';
import Comment from '../../components/comment/index';
import {Modal, Button, Form} from 'react-bootstrap';
import {createCommentForVacationRequestAsAdmin} from "../../utils/APIUtils";


const CommentList = (props) => {

    const request = props.parentProps.location.state.request;

    console.log("request i commentlist:")
    console.log(request)

    const [writeComment, setWriteComment] = useState(false);
    const handleShowWriteComment = () => setWriteComment(true);
    const handleCloseWriteComment = () => setWriteComment(false);

    function handleInputChange(event){
        addComment(event.target.value);
    }

    const [comment, addComment] = useState(null)
    const [newComment, setNewComment] = useState(null)


    function handleAddCommentAsAdmin(){
        console.log("addcommentpushed")
        console.log(comment)
        //sende comment til database
        createCommentForVacationRequestAsAdmin(request.request_id, comment)
        .then(resp => {
            console.log("response:")
            console.log(resp);
            setNewComment(resp);
        }).catch(err => {console.error(err)})
        setWriteComment(false);
    }


    const [commentList, setCommentList] = useState([]);

    useEffect(()=>{
        console.log("useffect som skal rendre hver gang noe blir lag til i commentList");
        console.log(request.comment)
        setCommentList(request.comment)
    },[newComment])


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
            {commentList.map((c, index) => {
                return(
                    <Comment comment={c}/>
                )
                
            })}
            
        </List>
    )
}

export default CommentList;
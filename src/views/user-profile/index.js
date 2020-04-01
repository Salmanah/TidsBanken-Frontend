import React, { useEffect, useState } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import { List, ListItem, ListItemText, Button, ListItemIcon } from '@material-ui/core';
import { getOtherUserAsAdmin } from "../../utils/APIUtils";
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';


const UserProfile = (props) => {


    const [userId, setUserId] = useState(props.location.userId);
    const [user, setUser] = useState(Object);

    useEffect(()=>{
        getOtherUserAsAdmin(userId)
        .then(resp => {
            console.log(resp)
            setUser(resp)
        }).catch(err => {console.error(err)})

    },[])


    function handleViewRequests(){
        props.history.push({
            pathname : "/VacationRequestHistory",
            state : {
                user : user
            }
        })
    }


    return(
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                <h1>User profile</h1>
                </Col>
            </Row>
            <Row >
                <Col md={{ span: 8, offset: 2 }}>
                    <div className="profileContent">
                    <Row>
                        <Col>
                            <img src={user.imageUrl} width="300" alt="Profile picture" />
                        </Col>
                        <Col>
                        <div className="listProfile">
                            <List>
                                <ListItem><ListItemIcon><PersonIcon/></ListItemIcon><ListItemText> Name: {user.name}</ListItemText></ListItem>
                                <ListItem><ListItemIcon><MailIcon/></ListItemIcon><ListItemText>Email: {user.email}</ListItemText></ListItem>
                                {user.admin ? (<ListItem><ListItemText><div className="profileRole">Admin</div></ListItemText></ListItem>) : null}
                                {props.currentUser.admin ? ( <ListItem><Button onClick={handleViewRequests}>View requests</Button></ListItem> ) : null}
                                
                            </List>
                        </div>
                            
                        </Col>
                    </Row>
                    </div>
                </Col>
                
            </Row>

        </Container>
    )
}

/*
class UserProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "No name",
            email: "No email",
            profilePic: "No picture",
            isAdmin: false,
            editEmail: false,
        }
    }

    editClick(event) {
        //perform update of email
        this.setState({
            editEmail: true
        })
    }

    emailInputChange(event) {
        console.log(event.target.value);
    }

    //Brukes ikke per nå
    componentDidMount() {
        getCurrentUser().then(response => {
            this.setState({
                name: response.name,
                email: response.email,
                profilePic: response.imageUrl,
                isAdmin: response.admin
            })
        })
    }

    handleCancelEdit(event) {
        this.setState({
            editEmail: false
        })
    }

    render() {

        return (
            <div>
                <h1>User profile</h1>
                <List>
                    <ListItem>
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText>{this.props.currentUser.name}</ListItemText>
                    </ListItem>
                    {this.state.editEmail ? (
                        <div>
                            <ListItem>
                                <ListItemIcon><MailIcon /></ListItemIcon>
                                <TextField placeholder="Enter email here" onChange={e => this.emailInputChange(e)}></TextField>
                                <IconButton edge="end" aria-label="cancel" onClick={e => this.handleCancelEdit(e)}><CloseIcon /></IconButton>
                                <IconButton edge="end" aria-label="approve"><CheckIcon /></IconButton>
                            </ListItem>
                        </div>
                    ) : (
                            <div>
                                <ListItem>
                                    <ListItemIcon><MailIcon /></ListItemIcon>
                                    <ListItemText>{this.props.currentUser.email}</ListItemText>
                                    <IconButton edge="end" aria-label="edit" onClick={e => this.editClick(e)}><EditIcon /></IconButton>
                                </ListItem>
                            </div>
                        )}
                </List>
                <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name} /><Button variant="outline-secondary" size="sm" onClick={e => this.editClick(e)}><EditIcon /></Button>
            </div>
        )
    }
}
*/

export default UserProfile;
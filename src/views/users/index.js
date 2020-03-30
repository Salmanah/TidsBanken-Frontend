import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './users.css';
import { getAllUsers } from '../../utils/APIUtils';
import {List} from '@material-ui/core';
import UserListItem from '../../components/user-list-item/index';
import {Spinner} from 'react-bootstrap';


//Admin setting view that displays a list of all registered users
//Each list item is rendered as a UserListItem component
const Users = (props) => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    //Fetching all users of the system
    useEffect(()=>{
        getAllUsers()
        .then(response=>{
            setUsers(response);
            setLoading(false);
        })
        .catch(error => {console.error(error)})
    }, [])

    if (props.currentUser.admin){
        return (
            <Container>
               <Row>
                   <Col md={{ span: 8, offset: 2 }}>
                        <h1>User settings</h1>
                    </Col>
                </Row>
                {loading ? 
                    (<Row><Col md={{ span: 8, offset: 5 }}><Spinner animation="border" /></Col></Row>) 
                    : (
                        <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <List>
                                {users.map((element, index) => {
                                    return <UserListItem key={index} user={element} parentProps={props} />                                    
                                })}
                            </List>
                        </Col>
                        </Row>
                        )
                    }       
            </Container>
    )
    } else {
        return(
            <div>
                Not authorized as admin, access not given
            </div>
        )
    }

    
}

export default Users;
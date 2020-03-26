import React, { useEffect } from 'react';
import CreateUser from '../../components/create-user/index';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './users.css';
import ToggleBox from '../../components/toggle-box/index';
import ViewAllUsers from '../../components/view-all-users/index';
import { getAllUsers } from '../../utils/APIUtils';
import {List} from '@material-ui/core';
import UserListItem from '../../components/user-list-item/index';
import {Spinner} from 'react-bootstrap';

const Users = (props) => {

    const [users, setUsers] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    useEffect(()=>{
        getAllUsers()
        .then(response=>{
            setUsers(response);
            setLoading(false);
        })
        .catch(error => {console.error('Error:', error)})
    }, [])

    if (props.currentUser.admin){
        return (
            <Container>
               <Row>
                   <Col md={{ span: 8, offset: 2 }}>
                   <div>
                        <h1>User settings</h1>
                        {loading ? 
                        (<Spinner animation="border" />) 
                        : (
                            <List>
                                {users.map((element, index) => {
                                    
                                        return <UserListItem key={index} user={element} parentProps={props} />
                                    
                                })}
                            </List>)
                        }
                    </div>
                   </Col>
               </Row>
                    
  
                
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
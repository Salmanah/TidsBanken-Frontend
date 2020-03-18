import React, { Component, useEffect} from 'react';
import './Profile.css';
import { getOtherUser, getOtherUserAsAdmin, createVacationRequest, getUserRequestsById,getUserRequestAndApproved,getAllUsers} from '../../utils/APIUtils';

function Profile(props){
    let [count, setCount] = React.useState(0); 

    
    useEffect(() =>{
        if(count < 3){
            getAllUsers()
            .then(response => {
              console.log("HELLOOO ",response); 
            }).catch(error => {
              console.log("ERROR HERE ",error)
            });
        }
    },[count])
    
       
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            { 
                            
                                props.currentUser.imageUrl ? (
                                    
                                    <img src={props.currentUser.imageUrl} alt={props.currentUser.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{props.currentUser.name && props.currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{props.currentUser.name}</h2>
                           <p className="profile-email">{props.currentUser.email}</p>
                        </div>
                    </div>
                </div>    
            </div>
        );
    }
export default Profile
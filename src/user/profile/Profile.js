import React, { useEffect } from 'react';
import './Profile.css';
import {adminEditVacationRequest,deleteVacationRequest,createVacationRequest, createCommentForVacationRequest} from '../../utils/APIUtils';

function Profile(props) {

    useEffect(() => {
        deleteVacationRequest(54)
            .then(response => {
                console.log("response: ", response);
            }).catch(error => {
                console.log("ERROR: ", error)
            });

    }, [])


    return (
        <div className="profile-container">
            <div className="container">
                <div className="profile-info">
                    <div className="profile-avatar">
                        {

                            props.currentUser.imageUrl ? (

                                <img src={props.currentUser.imageUrl} alt={props.currentUser.name} />
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
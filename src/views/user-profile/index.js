import React, { Component } from "react";
import ApplicationFrame from '../../components/application-frame/index';
import EditIcon from '@material-ui/icons/Edit';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import {Button} from 'react-bootstrap';

class UserProfile extends Component{

    constructor(props){
        super(props)
        this.state = {
            name : "No name",
            email : "No email",
            profilePic : "No picture",
            isAdmin : false
        }
    }

    componentDidMount(){
        let url = "https://rickandmortyapi.com/api/character/1";
        if (url === ""){
            console.log("not fetching");
        } else {
            fetch(url)
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp);
                console.log(resp.name)
                //this.setState({name:resp.name, email:resp.email, profilePic: resp.profile_pic, isAdmin:resp.isAdmin})
            })
        }
    }

    editClick(event){
        console.log("edit pushed");
    }

    render() {
        return(
            <div>
                <h1>User profile</h1>
                <p>Name: {this.state.name}</p>  
                <p>Email: {this.state.email} <Button variant="outline-secondary" size="sm" onClick={e => this.editClick(e)}><EditIcon /></Button></p>
                <img src={this.state.profilePic} alt="No image"/><Button variant="outline-secondary" size="sm" onClick={e => this.editClick(e)}><EditIcon /></Button>
               
            </div>
        ) 
    }
}

export default UserProfile;
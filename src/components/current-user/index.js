//IKKE I BRUK

import React, { Component } from "react";
import Cookies from 'universal-cookie';

class CurrentUser extends Component{

    
    
    render(){
        console.log(this.state.name)
        return(
            <div>
                <p>Currently logged in as: {this.state.name}</p>
            </div>
        )
    }
}

export default CurrentUser;
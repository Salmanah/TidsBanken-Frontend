import React, {Component} from "react";
import {Link} from "react-router-dom";

class Main extends Component{
    render(){
        return(
            <div>
                <h1>Main page</h1> 
                <Link to="CreateVacationRequest">Create vacation request</Link>
                <Link to="ViewVacationRequest">View vacation request</Link>
            </div>
           
        ) 
    }
}

export default Main;
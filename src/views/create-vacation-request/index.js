import React, { Component } from "react";
import { MDBBtn, MDBInput, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import './createVacationForm.css';
import ApplicationFrame from '../../components/application-frame/index';


class CreateVacationRequest extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            title : "",
            startDate : "",
            endingDate : "",
            comment : ""
        }
    }


    handleTitleChange(event){
        this.setState({title:event.target.value});
    }

    handleCommentChange(event){
        this.setState({comment:event.target.value});
    }

    handleStartDateChange(event){
        this.setState({startDate:event.target.value});
    }

    handleEndDateChange(event){
        this.setState({endingDate:event.target.value});
    }


    handleSubmitClick(event){
        console.log("submit button is pushed");
        console.log("Title: " + this.state.title);
        console.log("Start date: " + this.state.startDate);
        console.log("End date: " + this.state.endingDate);
        console.log("Comment: " + this.state.comment);
        
        //Aner ikke om dette funker, usikker på hvordan jeg skal teste det
        let url = "https://jsonplaceholder.typicode.com/posts";
        fetch(url, {
            method: 'POST',
            body: this.state,
            headers: {
                "Content-type" : "application/json, charset=UTF-8"
            }
        }).then(response => {
            console.log("Got response")
            this.props.history.push("/") //redirect after got response
            //return response.json()
        }).then(json => {
            console.log(json);
        }).then(
            this.setState({
                title: "",
                startDate : "",
                endingDate : "",
                comment : ""
            })
        )

    }



    render() {
        return (
            <div>
            {/*<ApplicationFrame/>*/}
            <MDBContainer>
            <MDBRow>
            <MDBCol md="10">
            <MDBCard>
                <MDBCardBody>
                    <form>
                        <p className="h4 text-center py-4">Vacation request form</p>
                        <label className="grey-text font-weight-light" >
                        Request title
                        </label>
                        <input
                        type="text"
                        id="defaultFormCardNameEx"
                        className="form-control"
                        value ={this.state.title}
                        onChange={e => this.handleTitleChange(e)}
                        required
                        />
                        <br/>

                        <label className="grey-text font-weight-light">
                            Vacation start date
                        </label>
                        <input 
                            type="date"
                            className="form-control"
                            onChange={e => this.handleEndDateChange(e)}
                            required
                            />
                        <br/>
                        <label className="grey-text font-weight-light">
                            Vacation end date
                        </label>
                        <input 
                            type="date"
                            className="form-control"
                            onChange={e => this.handleStartDateChange(e)}
                            required
                            />
                        <br/>
                        <label
                        htmlFor="defaultFormCardEmailEx"
                        className="grey-text font-weight-light" >
                        Comments
                        </label>
                        <MDBInput 
                            type="textarea" 
                            value = {this.state.comment}
                            onChange={e => this.handleCommentChange(e)}  />
                        <div className="text-center py-4 mt-3">
                            <button type="button" className="btn btn-primary" onClick={e => this.handleSubmitClick(e)}>
                                Submit
                            </button>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
            </MDBRow>
            </MDBContainer>
            </div>
            
        )
    }
}

export default CreateVacationRequest;
import React, { Component } from "react";
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import './createVacationForm.css';
//import { createVacationRequest } from "../../utils/APIUtils";
//import { AddAlertTwoTone } from "@material-ui/icons";


class CreateVacationRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maxVacationLength: 21, //skal kunne endres av admin i settings
            title: "",
            startDate: "",
            endingDate: "",
            comment: ""
        }
    }


    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleCommentChange(event) {
        this.setState({ comment: event.target.value });
    }

    handleStartDateChange(event) {
        this.setState({ startDate: event.target.value });
    }

    handleEndDateChange(event) {
        this.setState({ endingDate: event.target.value });
    }


    handleSubmitClick(event) {

        this.validateVacationPeriod(this.state.startDate, this.state.endingDate) ? (
            console.log("period ok")
        ) : (
                console.log("period not ok")
            );


        /*
        createVacationRequest(this.state.title, this.state.startDate, this.state.endingDate).then(response => {
            console.log("POST REQUEST RESPONSE: Request_id " + response)
            alert("Request successfully submitted")
            this.props.history.push("/")
        })*/
    }


    validateVacationPeriod(startDate, endingDate) {
        return false;
    }

    getFormattedDate(date) {
        //var today = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }

    addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }


    render() {

        let today = new Date();
        let maxEndDate = this.addDays(this.state.startDate, this.state.maxVacationLength);
        let minEndDate = this.addDays(this.state.startDate, 1);



        return (
            <div>
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
                                            className="form-control"
                                            value={this.state.title}
                                            onChange={e => this.handleTitleChange(e)}
                                            required
                                        />
                                        <br />

                                        <label className="grey-text font-weight-light">
                                            Vacation start date
                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            min={this.getFormattedDate(today)}
                                            onChange={e => this.handleStartDateChange(e)}
                                            required
                                        />
                                        <br />
                                        <label className="grey-text font-weight-light">
                                            Vacation end date
                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            min={this.getFormattedDate(minEndDate)}
                                            max={this.getFormattedDate(maxEndDate)}
                                            onChange={e => this.handleEndDateChange(e)}
                                            required
                                        />
                                        <br />
                                        <label
                                            htmlFor="defaultFormCardEmailEx"
                                            className="grey-text font-weight-light" >
                                            Comments
                        </label>
                                        <MDBInput
                                            type="textarea"
                                            value={this.state.comment}
                                            onChange={e => this.handleCommentChange(e)} />
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
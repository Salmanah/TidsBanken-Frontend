import React, { useState } from "react";
import { MDBInput, MDBContainer, MDBRow, MDBCard, MDBCardBody } from 'mdbreact';
import './createVacationForm.css';
import { createVacationRequest, createCommentForVacationRequest, getUserRequestsById } from "../../utils/APIUtils";
import { Col } from 'react-bootstrap';


const CreateVacationRequest = (props) => {

    const [maxVacationLength] = useState(21); //skal kunne endres
    const [comment, setComment] = useState("");
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    function handleTitleChange(event) {
        //this.setState({ title: event.target.value });
        setTitle(event.target.value);
    }

    function handleCommentChange(event) {
        //this.setState({ comment: event.target.value });
        setComment(event.target.value);
    }

    function handleStartDateChange(event) {
        //this.setState({ startDate: event.target.value });
        setStartDate(event.target.value);
    }

    function handleEndDateChange(event) {
        //this.setState({ endingDate: event.target.value });
        setEndDate(event.target.value);
    }

    function handleSubmitClick(event) {
        createVacationRequest(title, startDate, endDate)
            .then(response => {
                console.log(response)
                createCommentForVacationRequest(response, comment)
                    .then(resp => {
                        console.log(resp)
                        alert("Request successfully submitted")
                        getUserRequestsById(resp.user[0].id).then(resp => {
                            let req = resp[resp.length - 1];

                            props.history.push({
                                pathname: "/ViewVacationRequest",
                                state: {
                                    request: req
                                }
                            });
                        })

                    })
            })
    }

    function getFormattedDate(date) {
        //var today = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }


    let today = new Date();
    let maxEndDate = addDays(startDate, maxVacationLength);
    let minEndDate = addDays(startDate, 1);


    return (
        <div>
            <MDBContainer>
                <MDBRow>
                    <Col md={{ span: 6, offset: 3 }}>
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
                                        value={title}
                                        onChange={e => handleTitleChange(e)}
                                        required
                                    />
                                    <br />

                                    <label className="grey-text font-weight-light">
                                        Vacation start date
                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        min={getFormattedDate(today)}
                                        onChange={e => handleStartDateChange(e)}
                                        required
                                    />
                                    <br />
                                    <label className="grey-text font-weight-light">
                                        Vacation end date
                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        min={getFormattedDate(minEndDate)}
                                        max={getFormattedDate(maxEndDate)}
                                        onChange={e => handleEndDateChange(e)}
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
                                        value={comment}
                                        onChange={e => handleCommentChange(e)} />
                                    <div className="text-center py-4 mt-3">
                                        <button type="button" className="btn btn-primary" onClick={e => handleSubmitClick(e)}>
                                            Submit
                            </button>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </Col>
                </MDBRow>
            </MDBContainer>
        </div>

    )

}

export default CreateVacationRequest;
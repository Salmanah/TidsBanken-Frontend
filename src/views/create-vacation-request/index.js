import React, { useEffect, useState } from "react";
import './createVacationForm.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { MDBCard, MDBCardBody } from 'mdbreact';
import { addDays } from 'date-fns';
import { createVacationRequest, createCommentForVacationRequest, getUserRequestsById, getAllIneligiblePeriods, getMaxVacationDays } from "../../utils/APIUtils";
import { Container, Row, Col } from 'react-bootstrap';
import { getDates, getNumberOfVacationDaysSpent } from '../../utils/common.js'

const CreateVacationRequest = (props) => {

    const [maxVacationLength, setMaxVacationLength] = useState();
    const [comment, setComment] = useState("");
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState("");
    const [allIneligibles, setAllIneligibles] = useState([]);
    const [ineligible, setIneligible] = useState([])
    const [request, setRequest] = useState([]);
    const [totalVacationDays] = useState(25)
    const [vacationDaysSpent, setVacationDaysSpent] = useState();
    const [allVacationRequests, setAllVacationRequests] = useState([]);
    const [excludedDays, setExcludedDays] = useState([]);
    const [max, setMax] = useState()

    useEffect(() => {
        getAllIneligiblePeriods().then(resp => setAllIneligibles(resp)).catch(err => console.log(err));
        getUserRequestsById(props.currentUser.id).then(resp => setAllVacationRequests(resp)).catch(err => console.log(err));
        getMaxVacationDays().then(resp => setMaxVacationLength(resp)).catch(err => console.log(err));
    }, [])

    useEffect(() => {

        if (allIneligibles.length > 0) {
            let tmp = [];
            allIneligibles.forEach(inel => {
                let dates = getDates(inel.period_start, inel.period_end);

                for (let i = 0; i < dates.length; i++) {
                    let el = dates[i].split("-");
                    let date = el[0] + "," + el[1] + "," + el[2]
                    tmp.push(new Date(date))
                }
            })
            setIneligible(tmp)
        }

    }, [allIneligibles])

    useEffect(() => {

        let spent = getNumberOfVacationDaysSpent(allVacationRequests)
        setVacationDaysSpent(spent)

        if (allVacationRequests.length > 0) {
            let tmp = [];
            let dates;
            allVacationRequests.forEach(req => {
                return dates = getDates(req.period_start, req.period_end);
            })

            for (let i = 0; i < dates.length; i++) {
                let el = dates[i].split("-");
                let date = el[0] + "," + el[1] + "," + el[2]
                tmp.push(new Date(date))
            }
            setRequest(tmp)
        }
    }, [allVacationRequests])

    useEffect(() => {
        let tmp = []
        tmp = [...ineligible, ...request]
        setExcludedDays(tmp);

    }, [ineligible, request])

    useEffect(() => {
        if (startDate) {
            let daysUntilNextExcludedDay = getNextExcludedDay();
            let remainingVacationDays = getRemainingVacationDays();
            let next = Math.min(daysUntilNextExcludedDay, maxVacationLength, remainingVacationDays)
            setMax(next)
        }

    }, [startDate, maxVacationLength, excludedDays])

    function getRemainingVacationDays() {
        return (totalVacationDays - vacationDaysSpent) - 1; //- 1 or else it counts from startDate
    }

    function getNextExcludedDay() {
        let differenceInDays = []

        excludedDays.forEach(day => {
            //if excluded day is after the start date
            if (day > startDate) {
                // get days between start date and excluded day
                let diffTime = day.getTime() - startDate.getTime();
                let diffDays = diffTime / (1000 * 3600 * 24);
                diffDays = Math.round(diffDays)
                differenceInDays.push(diffDays)
            }
        })
        // return the days until the next excluded day
        return Math.min.apply(Math, differenceInDays)
    }

    function handleTitleChange(e) {
        let input = document.getElementById(e.target.name);
        let message = document.getElementById(`message-${e.target.name}`);
        message.textContent = "";
        if (validate(input, message)) {
            setTitle(e.target.value);
        }
    }

    function handleStartDateSelect(date) {
        setStartDate(date);
    };

    function handleEndDateSelect(date) {
        setEndDate(date);
    }
    function handleCommentChange(e) {
        let input = document.getElementById(e.target.name);
        let message = document.getElementById(`message-${e.target.name}`);
        message.textContent = ""

        if (input.value !== "") {
            let pattern = patternForHTMLtags()
            if (pattern.test(input.value)) {
                message.classList.add("invalid")
                message.textContent = "Invalid input for comment";
            } else {
                setComment(e.target.value);
            }
        }
    }

    function handleSubmit() {
        /*let start_date = getFormattedDate(startDate);
        let end_date = getFormattedDate(endDate);
        console.log(title, comment)
        createVacationRequest(title, start_date, end_date)
            .then(response => {
                console.log(response)
                createCommentForVacationRequest(response, comment)
                    .then(resp => {
                        console.log(resp)
                        alert("Request successfully submitted")
                        getUserRequestsById(resp.user[0].id).then(resp => {
                            let req = resp[resp.length - 1];
                            //hent ut id her

                            props.history.push({
                                pathname: "/ViewVacationRequest",
                                state: {
                                    request: req
                                }
                            });
                        })
                    })
            })*/
    }


    function getFormattedDate(date) {

        let month = date.getMonth() + 1; //January is 0!
        let day = date.getDate();
        let year = date.getFullYear();

        if (month < 10)
            month = "0" + month;

        if (day < 10)
            day = "0" + day;

        return year + "-" + month + "-" + day;
    }

    function patternForHTMLtags() {
        // double spaces and opening and closing tags
        return /(  )|<(.|\n)*?>/g;
    }

    function patternForTitle() {
        // uppercase/lowercase a-å, multiple sentences and numbers
        return "^[a-zA-Z0-9æøåÆØÅ]+([ a-zA-Z0-9æøåÆØÅ]+)*$"
    }

    function validate(input, message) {
        if (!input.checkValidity()) {
            message.textContent = input.validationMessage;
            message.classList.add("invalid")
            return false;
        }
    }
    return (
        <Container >
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <MDBCard className="my-4">
                        <MDBCardBody>
                            <form>

                                <Col md={12} className="my-2">
                                    <p className="h4 text-center py-3">Vacation request form</p>
                                </Col>
                                <Row>
                                    <Col md={12} className="my-2">
                                        <label className="grey-text font-weight-light" >
                                            * Title
                                        </label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => handleTitleChange(e)}
                                            pattern={patternForTitle()}
                                            minLength="3"
                                            maxLength="20"
                                            required />

                                        <small id="message-title" className="p-2"></small>
                                    </Col>
                                </Row>
                                <Row className="my-2">
                                    <Col md={6}>
                                        <label className="grey-text font-weight-light">
                                            * Vacation start date
                                      </label>
                                        <DatePicker
                                            id="startDate"
                                            name="startDate"
                                            excludeDates={excludedDays}
                                            minDate={new Date()}
                                            dateFormat="dd/MM/yyyy"
                                            onSelect={handleStartDateSelect}
                                            selected={startDate}
                                            required
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <label className="grey-text font-weight-light">
                                            * Vacation end date
                                          </label>
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            excludeDates={excludedDays}
                                            minDate={startDate}
                                            maxDate={addDays(startDate, max)}
                                            onSelect={handleEndDateSelect}
                                            selected={endDate}
                                            required
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className="my-2">
                                        <label
                                            className="grey-text font-weight-light" >
                                            Comment
                                          </label>
                                        <br />
                                        <textarea
                                            id="comment"
                                            name="comment"
                                            cols="5"
                                            rows="3"
                                            className="form-control"
                                            maxLength="200"
                                            onChange={(e) => handleCommentChange(e)}
                                        />
                                        <small id="message-comment" className="p-2"></small>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className="text-center mt-2">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={e => handleSubmit(e)}>
                                            Submit
                                      </button>
                                    </Col>
                                </Row>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </Col>
            </Row>
        </Container >
    )
}

export default CreateVacationRequest;
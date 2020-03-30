import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { addDays, parseISO } from 'date-fns';
import { Modal, Button } from 'react-bootstrap';
import { MDBBtn } from "mdbreact";
import { createIneligiblePeriod, getAllIneligiblePeriods, } from '../../utils/APIUtils';
import { getDates } from '../../utils/common.js'


function CreateIneligiblePeriod() {

    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [allIneligibles, setAllIneligibles] = useState([]);
    const [ineligible, setIneligible] = useState([])
    const [max, setMax] = useState()
    const [enableEndDate, setEnableEndDate] = useState(true);


    useEffect(() => {
        getAllIneligiblePeriods().then(resp => setAllIneligibles(resp)).catch(err => console.log(err));

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
        if (startDate) {
            let daysUntilNextIneligible = getNextExcludedDay();
            setMax(daysUntilNextIneligible)
        }

    }, [startDate]);


    function getNextExcludedDay() {
        let differenceInDays = []

        ineligible.forEach(day => {
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

    function handleStartDateSelect(date) {
        setStartDate(date)
        setEnableEndDate(false);
    }

    function handleEndDateSelect(date) {
        setEndDate(date)
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

    function handleSubmit(e) {
        e.preventDefault();
        let start_date = getFormattedDate(startDate);
        let end_date = getFormattedDate(endDate);
        createIneligiblePeriod(start_date, end_date)
            .then(response => {
                console.log(response)
                alert("Ineligible period successfully created")
                setShow(false)
            })
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <MDBBtn className="btn" onClick={handleShow}>Create ineligible period</MDBBtn>
            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Modal.Header closeButton>
                        <Modal.Title>Create ineligible period</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <label htmlFor="inStartDate">Start date</label>
                        <br />
                        <DatePicker
                            excludeDates={ineligible}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            onSelect={handleStartDateSelect}
                            selected={startDate}
                            required
                        />
                        <br /> <br />
                        <br />
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            excludeDates={ineligible}
                            minDate={startDate}
                            maxDate={addDays(parseISO(startDate), max)}
                            onSelect={handleEndDateSelect}
                            selected={endDate}
                            disabled={enableEndDate}
                            required
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <input
                            type="submit"
                            className="btn btn-primary" >
                        </input>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default CreateIneligiblePeriod;
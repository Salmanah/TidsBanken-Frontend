import React from 'react';
import Calendar from "../../components/calendar";
import CalendarBadge from "../../components/calendar-badge/";
import CalendarSearchSelect from "../../components/calendar-search-select/";
import CalendarSwitch from "../../components/calendar-switch/";
import { Row, Col, Container } from "react-bootstrap";
import CalendarLabel from '../../components/calendar-label/';
import './calendar-view.css';
import { MDBBtn } from "mdbreact";
import { Link } from 'react-router-dom';
import CreateIneligiblePeriod from '../../views/create-ineligible-period/index';


function CalendarView(props) {

    const [checked, setChecked] = React.useState(false);

    const [selectedPeople] = React.useState([
        { value: 1, label: 'Ola Helgesen' },
        { value: 2, label: 'Hevaluei Furnes' },
        { value: 3, label: 'Åge Alexandersson' },
        { value: 4, label: 'Arne Hoie' },
        { value: 5, label: 'Hege Aarnes' },
        { value: 6, label: 'Ørjan Sagstuen' },
        { value: 7, label: 'Pernille Frisli' },
        { value: 8, label: 'Cecilie Nordstrand' },
        { value: 9, label: 'Rasmus Andersen' },
        { value: 10, label: 'Marie Nes' },
        { value: 11, label: 'Suzanne Smith' },
        { value: 12, label: 'Cecilie Andersen' },
        { value: 13, label: 'Phong Fui' },
        { value: 14, label: 'Kim-Andrè Mernes' },
        { value: 15, label: 'Ahmet Finasso' },
        { value: 16, label: 'Henrik Eriksson' },
        { value: 17, label: 'Anita Rud Rosenborg' },
        { value: 18, label: 'Espen Medlien' },
        { value: 19, label: 'Jorunn Elisabeth Rud' },
        { value: 20, label: 'Torkel Medlien' },
        { value: 21, label: 'Marit Dybsand' },
        { value: 22, label: 'Carl-Emil Rud Engelberg' },
        { value: 23, label: 'Tonje Athina Rud Engelberg' },
        { value: 24, label: 'Dennis Rud Rosenborg' },
        { value: 25, label: 'Daniel Medlien' },
        { value: 26, label: 'valuea Susanne Rud' },
        { value: 27, label: 'Malin Rud' }
    ]);

    const [pendingDates] = React.useState([
        { start: '2020-03-03', end: '2020-3-7' },
        { start: '2020-05-3', end: '2020-05-7' }
    ]);

    const [ineligibleDates] = React.useState([
        { start: '2020-04-9', end: '2020-04-11' },
        { start: '2020-03-9', end: '2020-03-11' }
    ]);

    const [approvedDates] = React.useState([
        { start: '2020-03-12', end: '2020-03-15' },
        { start: '2020-04-12', end: '2020-04-14' }
    ]);

    const [selected] = React.useState([]);
    const [selectedOptions, setSelectedOptions] = React.useState(selected);

    const handleChange = selectedOption => {
        let alreadySelected = selectedOptions.includes(selectedOption);

        if (!alreadySelected) {
            setSelectedOptions(selected => [...selected, selectedOption]);
        } else {
            console.log("you have already selected this user")
        }
    };

    let selectedPeopleBadges = selectedOptions.map((person) => {
        return <CalendarBadge key={person.value} name={person.label} delete={() => handleDelete(person.value)} />
    });

    const handleToggleChecked = () => {
        setChecked(prev => !prev);
    };

    const handleDelete = id => {

        let newArray = selectedOptions.filter(e =>
            e.value !== id
        );
        setSelectedOptions(newArray);
    }

    return (
        <div>
            <Container className="contentContainer">
                <Row>
                    <Col>
                        <h1>My calendar</h1>
                    </Col>
                    <Col className="my-4 text-right my-auto">
                        {props.admin ? <CreateIneligiblePeriod /> : <Link to="/CreateVacationRequest"><MDBBtn className="btn btn-elegant mr-2">Create vacation request</MDBBtn></Link>}
                    </Col>
                </Row>

                {props.admin ?
                    (<>
                        <Row>
                            <Col md={5}>
                                <CalendarSearchSelect options={selectedPeople} change={handleChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mx-5 my-2 p-2">
                                {selectedPeopleBadges}
                            </Col>
                        </Row>
                    </>)
                    :
                    (<>
                        <Row>
                            <Col md={5}>
                                <CalendarSwitch isChecked={checked} toggleChecked={handleToggleChecked} />
                            </Col>
                            <Col md={4}>
                                {checked ? <CalendarSearchSelect options={selectedPeople} change={handleChange} /> : null}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mx-5 my-2 p-2">
                                {checked ? selectedPeopleBadges : null}
                            </Col>
                        </Row>
                    </>)
                }
                <Row>
                    <Col>
                        {props.admin ? <Calendar ineligible={ineligibleDates} /> : <Calendar pending={pendingDates} approved={approvedDates} ineligible={ineligibleDates} />}
                    </Col>
                </Row>
                <Row>
                    <Col className="under-calendar mb-5">
                        <CalendarLabel />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CalendarView;
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


function CalendarView(props) {
    console.log(props)

    const [checked, setChecked] = React.useState(false);

    const [selectedPeople, setSelectedPeople] = React.useState([
        { value: 'Ola Helgesen', label: 'Ola Helgesen' },
        { value: 'Heidi Furnes', label: 'Heidi Furnes' },
        { value: 'Åge Alexandersson', label: 'Åge Alexandersson' },
        { value: 'Arne Hoie', label: 'Arne Hoie' },
        { value: 'Hege Aarnes', label: 'Hege Aarnes' },
        { value: 'Ørjan Sagstuen', label: 'Ørjan Sagstuen' },
        { value: 'Pernille Frisli', label: 'Pernille Frisli' },
        { value: 'Cecilie Nordstrand', label: 'Cecilie Nordstrand' },
        { value: 'Rasmus Andersen', label: 'Rasmus Andersen' },
        { value: 'Marie Nes', label: 'Marie Nes' },
        { value: 'Suzanne Smith', label: 'Suzanne Smith' },
        { value: 'Cecilie Andersen', label: 'Cecilie Andersen' },
        { value: 'Phong Fui', label: 'Phong Fui' },
        { value: 'Kim-Andrè Mernes', label: 'Kim-Andrè Mernes' },
        { value: 'Ahmet Finasso', label: 'Ahmet Finasso' },
        { value: 'Henrik Eriksson', label: 'Henrik Eriksson' },
        { value: 'Anita Rud Rosenborg', label: 'Anita Rud Rosenborg' },
        { value: 'Espen Medlien', label: 'Espen Medlien' },
        { value: 'Jorunn Elisabeth Rud', label: 'Jorunn Elisabeth Rud' },
        { value: 'Torkel Medlien', label: 'Torkel Medlien' },
        { value: 'Marit Dybsand', label: 'Marit Dybsand' },
        { value: 'Carl-Emil Rud Engelberg', label: 'Carl-Emil Rud Engelberg' },
        { value: 'Tonje Athina Rud Engelberg', label: 'Tonje Athina Rud Engelberg' },
        { value: 'Dennis Rud Rosenborg', label: 'Dennis Rud Rosenborg' },
        { value: 'Daniel Medlien', label: 'Daniel Medlien' },
        { value: 'Ida Susanne Rud', label: 'Ida Susanne Rud' },
        { value: 'Malin Rud', label: 'Malin Rud' }
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
        return <CalendarBadge key={person.value} name={person.value} delete={() => handleDelete(person.value)} />
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
                        <Link to="/CreateVacationRequest"><MDBBtn className="btn btn-elegant mr-2">Create vacation request</MDBBtn></Link>
                        <Link to="/CreateIneligiblePeriod"><MDBBtn className="btn btn-elegant">Create ineligible period</MDBBtn></Link>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 5 }}>
                        <CalendarSwitch isChecked={checked} toggleChecked={handleToggleChecked} />
                    </Col>
                    <Col md={{ span: 4 }}>
                        {checked ? <CalendarSearchSelect options={selectedPeople} change={handleChange} /> : null}
                    </Col>
                </Row>
                <Row>
                    <Col className="mx-5 my-2 p-2">
                        {checked ? selectedPeopleBadges : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Calendar />
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
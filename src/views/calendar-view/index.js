import React, { useEffect } from 'react';
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
import { getUserRequestsById } from '../../utils/APIUtils';


function CalendarView(props) {

    const [checked, setChecked] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [selected] = React.useState([]);
    const [selectedOptions, setSelectedOptions] = React.useState(selected);

    const [pendingDates] = React.useState([
        { start: '2020-03-03', end: '2020-03-07' },
        { start: '2020-05-03', end: '2020-05-07' }
    ]);

    const [ineligibleDates] = React.useState([
        { start: '2020-03-09', end: '2020-03-11' },
        { start: '2020-04-09', end: '2020-04-11' }
    ]);

    const [approvedDates] = React.useState([
        { start: '2020-03-12', end: '2020-03-15' },
        { start: '2020-04-12', end: '2020-04-14' }
    ]);
    useEffect(() => {
        let tmpusers = []
        props.allUsers.forEach(user => {
            if (!user.admin) {
                tmpusers.push({ value: user.id, label: user.name })
            }
        });
        setUsers(tmpusers)

        getUserRequestsById(props.id).then(resp => { console.log(resp) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleChange = selectedOption => {
        let alreadySelected = selectedOptions.includes(selectedOption);

        if (!alreadySelected) {
            setSelectedOptions(selected => [...selected, selectedOption]);
        } else {
            console.log("you have already selected this user")
        }
    };

    let selectedPeopleBadges = selectedOptions.map((user) => {
        return <CalendarBadge key={user.value} name={user.label} delete={() => handleDelete(user.value)} />
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
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>My calendar</h1>
                    </Col>
                    <Col className="my-4 text-right my-auto">
                        {props.admin ? <CreateIneligiblePeriod /> : <Link to="/CreateVacationRequest"><MDBBtn className="btn btn-unique mr-2">Create vacation request</MDBBtn></Link>}
                    </Col>
                </Row>

                {props.admin ?
                    (<>
                        <Row>
                            <Col md={5}>
                                <CalendarSearchSelect options={users} change={handleChange} />
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
                                {checked ? <CalendarSearchSelect options={users} change={handleChange} /> : null}
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
                        {props.admin ? <Calendar ineligible={ineligibleDates} /> : !checked ? <Calendar checked={checked} pending={pendingDates} approved={approvedDates} ineligible={ineligibleDates} /> : <Calendar checked={checked} pending={null} approved={null} ineligible={ineligibleDates} />}
                    </Col>
                </Row>
            </Container>
            <CalendarLabel />
        </>
    )
}

export default CalendarView;
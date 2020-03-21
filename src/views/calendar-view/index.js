import React, { useEffect } from 'react';
import Calendar from "../../components/calendar";
import CalendarBadge from "../../components/calendar-badge/";
import CalendarSearchSelect from "../../components/calendar-search-select/";
import CalendarSwitch from "../../components/calendar-switch/";
import { Row, Col, Container } from "react-bootstrap";
import CalendarLabel from '../../components/calendar-label/';
import './calendar-view.css';
import { MDBBtn, MDBContainer } from "mdbreact";
import { Link } from 'react-router-dom';
import CreateIneligiblePeriod from '../../views/create-ineligible-period/index';
import { getUserRequestsById } from '../../utils/APIUtils';


function CalendarView(props) {

    const [checked, setChecked] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [selected] = React.useState([]);
    const [allVacations, setAllVacations] = React.useState([]);
    const [selectedOptions, setSelectedOptions] = React.useState(selected);

    const [allApprovedVacations, setAllApprovedVacations] = React.useState([]);
    const [allSelectedVacations, setAllSelectedVacations] = React.useState([]);
    const [pendingDates, setPendingDates] = React.useState([]);
    const [deniedDates, setDeniedDates] = React.useState([]);
    const [ineligibleDates] = React.useState([
        { start: '2020-03-09', end: '2020-03-11' },
        { start: '2020-04-09', end: '2020-04-11' }
    ]);

    const [approvedDates, setApprovedDates] = React.useState([]);

    useEffect(() => {

        let tmpusers = []
        props.allUsers.forEach(user => {
            if (!user.admin && user.id !== props.id) {
                tmpusers.push({ value: user.id, label: user.name })
            }
        });
        setUsers(tmpusers)
    }, [props.allUsers])

    useEffect(() => {
        let tmppending = [];
        let tmpapproved = [];
        let tmpdenied = [];
        props.requests.forEach(req => {
            if (req.status[0].status === 'Pending') {
                tmppending.push({ start: req.period_start, end: req.period_end })
            }
            else if (req.status[0].status === 'Approved') {
                tmpapproved.push({ start: req.period_start, end: req.period_end })
            } else {
                tmpdenied.push({ start: req.period_start, end: req.period_end })
            }
        });
        setPendingDates(tmppending)
        setApprovedDates(tmpapproved)
        setDeniedDates(tmpdenied)

    }, [props.requests])

    useEffect(() => {
        //let tmpineligible = [];

        //console.log(tmpineligible)
        // props.requests.forEach(req => {
        //tmpineligible.push({ start: req.period_start, end: req.period_end })


        //});
        //setIneligibleDates(tmpineligible)

    }, [props.ineligible])


    useEffect(() => {

        if (allVacations.length > 0) {
            let approved = [];
            let all = [];

            allVacations.forEach(element => {
                element.forEach(el => {
                    if (el.status[0].status === 'Approved') {
                        approved.push(el);

                    }

                    else if (props.admin) {
                        console.log("get all")
                    }
                })
            });
            setAllApprovedVacations(approved)
            setAllSelectedVacations(all);

        }
    }, [allVacations])

    useEffect(() => {

    }, [allApprovedVacations])


    const handleChange = selectedOption => {
        let alreadySelected = selectedOptions.includes(selectedOption);

        if (!alreadySelected) {
            setSelectedOptions(selected => [...selected, selectedOption]);
            getSelectedUserVacationRequests(selectedOption.value);
        } else {
            console.log("you have already selected this user")
        }
    };

    function getSelectedUserVacationRequests(id) {

        getUserRequestsById(id).then(resp => {
            setAllVacations([...allVacations, resp]);
        })
    }

    let selectedPeopleBadges = selectedOptions.map((user) => {
        return <CalendarBadge key={user.value} name={user.label} delete={() => handleDelete(user.value)} />
    });

    const handleToggleChecked = () => {
        setChecked(prev => !prev);
    };

    const handleDelete = id => {

        let newSelectedOptions = selectedOptions.filter(e =>
            e.value !== id
        );
        setSelectedOptions(newSelectedOptions);

        let newAllApprovedVacations = allApprovedVacations.filter(e => {

            return e.owner[0].id !== id;
        })
        setAllApprovedVacations(newAllApprovedVacations)

        let newAllVacations = allVacations.filter(user => {

            let remove = user.forEach(vac => {
                return vac.owner[0].id !== id
            });
            return remove
        })
        setAllVacations(newAllVacations)

    }

    return (
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
                    {props.admin ?
                        <Calendar admin='true' ineligible={ineligibleDates} allSelectedUserVacations={allApprovedVacations} />
                        :
                        !checked ?
                            <Calendar checked={checked} pending={pendingDates} approved={approvedDates} ineligible={ineligibleDates} denied={deniedDates} />
                            :
                            <Calendar checked={checked} pending={null} approved={null} allSelectedUserVacations={allApprovedVacations} ineligible={ineligibleDates} />}
                </Col>
            </Row>
            <Row className="mb-5">
                <Col>
                    <MDBContainer>
                        {props.admin || !checked ? <CalendarLabel labels={["Ineligible", "Approved", "Denied", "Pending"]} /> : <CalendarLabel labels={["Ineligible", "Approved"]} />}
                    </MDBContainer>
                </Col>
            </Row>
        </Container>
    )
}

export default CalendarView;
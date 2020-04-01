import React, { useEffect, useState } from "react";
import './vacationSettings.css';
import { Input, Button, ListItem, ListItemText, List, Collapse } from '@material-ui/core';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { printDate } from '../../utils/common';
import { getAllIneligiblePeriods, deleteIneligiblePeriod, getMaxVacationDays, setMaxVacationDays } from '../../utils/APIUtils';

function VacationSettings() {

    const [openIneligible, setOpenIneligible] = useState(false);
    const [ineligiblePeriods, setIneligiblePeriods] = useState([]);
    const [maxVacation, setMaxVacation] = useState(0);
    const [newMaxVacation, setNewMaxVacation] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        getAllIneligiblePeriods().then(resp => { setIneligiblePeriods(resp) }).catch(err => { console.error(err.message) })
        getMaxVacationDays().then(resp => { setMaxVacation(resp); setNewMaxVacation(resp) }).catch(err => { console.error(err.message) })
    }, [])

    useEffect(() => { }, [ineligiblePeriods, maxVacation])

    function handleDeleteIneligible(id) {
        deleteIneligiblePeriod(id).then(resp => { console.log(resp) }).catch(err => { console.error(err.message) })

        let newIneligiblePeriods = ineligiblePeriods.filter(ip => ip.ip_id !== id)

        setIneligiblePeriods(newIneligiblePeriods)
    }

    function handleSaveMaxVacation() {
        if (showConfirm == true) {
            setShowConfirm(false);
        }

        if (newMaxVacation !== "") {
            console.log(newMaxVacation)

            setMaxVacationDays(newMaxVacation)
                .then(resp => {
                    console.log(resp);
                    setMaxVacation(newMaxVacation)
                    alert("Success: you have set a new max for max vacation days")
                })
                .catch(err => { console.error(err.message) })
        }
    }

    function checkMax() {
        if (maxVacation > newMaxVacation) {
            setShowConfirm(!showConfirm)
        } else {
            handleSaveMaxVacation();
        }
    }

    function handleMaxVacationOnchange(e) {
        let input = parseInt(e.target.value);
        setNewMaxVacation(input)
    }

    return (
        <Container>
            <Row className="settingsContent">
                <Col md={{ span: 10, offset: 1 }}>
                    <Row>
                        <Col md={12}>
                            <h1>Vacation settings</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <List>
                                <ListItem>
                                    <ListItemText className="mr-5">Max vacation days per request: {maxVacation}</ListItemText>
                                    <ListItemText className="text-right">
                                        <small className="mr-5 small-text">Change max number: </small>
                                        <Input id="max-vacation-number" type="number" onChange={(e) => handleMaxVacationOnchange(e)} value={newMaxVacation}></Input>
                                        <Button color="primary" onClick={() => checkMax()}>save</Button>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={12}>
                            <ListItem button onClick={() => setOpenIneligible(!openIneligible)}>
                                <ListItemText>Ineligible periods</ListItemText>
                                {openIneligible ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Collapse in={openIneligible}>
                                <List>
                                    {ineligiblePeriods.length > 0 ?
                                        ineligiblePeriods.map((element) => {
                                            return (
                                                <List key={element.ip_id}>
                                                    <ListItem className="pt-0">
                                                        <ListItemText>
                                                            Period: <em>{printDate(element.period_start)} - {printDate(element.period_end)} </em>
                                                        </ListItemText>

                                                        <ListItemText>
                                                            Created by: <em>{element.created_by[0].name}</em>
                                                        </ListItemText>

                                                        <Button color="secondary" onClick={() => handleDeleteIneligible(element.ip_id)}>
                                                            delete
                                                        </Button>
                                                    </ListItem>
                                                </List>
                                            )
                                        })
                                        : <em>There are no ineligible periods recorded yet...</em>}
                                </List>
                            </Collapse>
                        </Col>
                    </Row>
                </Col>

                <Modal show={showConfirm} onHide={() => setShowConfirm(!showConfirm)}>
                    <Modal.Header>
                        <Modal.Title>NB!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListItemText>Completing this action results in a decrease of the user's available vacation days.
                        Make sure the users of the system are aware of the decrease and have not already reached a
                            total higher than the new max. Are you sure you'd like to complete this action?</ListItemText>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className=" pr-2" onClick={() => setShowConfirm(!showConfirm)} >Cancel</Button>
                        <Button onClick={() => handleSaveMaxVacation()} >Yes, I am sure</Button>
                    </Modal.Footer>

                </Modal>
            </Row>
        </Container >
    )
}

export default VacationSettings;
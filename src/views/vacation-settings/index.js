import React, { useEffect, useState } from "react";
import './vacationSettings.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Input, Button, ListItem, ListItemText, List, Collapse } from '@material-ui/core';
import { Container, Row, Col } from 'react-bootstrap';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { confirmAlert } from 'react-confirm-alert';
import { printDate } from '../../utils/common';
import { getAllIneligiblePeriods, deleteIneligiblePeriod, getMaxVacationDays, setMaxVacationDays } from '../../utils/APIUtils';

function VacationSettings() {

    const [openIneligible, setOpenIneligible] = useState(false);
    const [ineligiblePeriods, setIneligiblePeriods] = useState([]);
    const [maxVacation, setMaxVacation] = useState(0);

    useEffect(() => {
        getAllIneligiblePeriods().then(resp => { setIneligiblePeriods(resp) }).catch(err => { console.error(err.message) })
        getMaxVacationDays().then(resp => { setMaxVacation(resp) }).catch(err => { console.error(err.message) })
    }, [])

    useEffect(() => { }, [ineligiblePeriods, maxVacation])

    function handleDeleteIneligible(id) {
        deleteIneligiblePeriod(id).then(resp => { console.log(resp) }).catch(err => { console.error(err.message) })

        let newIneligiblePeriods = ineligiblePeriods.filter(ip => ip.ip_id !== id)

        setIneligiblePeriods(newIneligiblePeriods)
    }

    function handleSaveMaxVacation() {
        let maxVacationNumber = document.getElementById("max-vacation-number").value



        if (confirm("Press a button!")) {
            console.log("You pressed OK!");
        } else {
            console.log("You pressed Cancel!");
        }
        if (maxVacationNumber !== "") {

            /* setMaxVacationDays(maxVacationNumber)
                 .then(resp => {
                     console.log(resp);
                     setMaxVacation(maxVacationNumber)
                 })
                 .catch(err => { console.error(err.message) })*/
        }
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
                                        {/*key forces defaultvalue to render */}
                                        <Input key={`${Math.floor((Math.random() * 1000))}-min`} id="max-vacation-number" type="number" defaultValue={maxVacation}></Input>
                                        <Button color="primary" onClick={() => handleSaveMaxVacation()}>save</Button>
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
                                                <List>
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
            </Row>
        </Container >
    )
}

export default VacationSettings;
import React, { useEffect, useState } from "react";
import './vacationSettings.css';
import { Button, ListItem, ListItemText, List, Collapse } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { getAllIneligiblePeriods, deleteIneligiblePeriod } from '../../utils/APIUtils';

function VacationSettings() {

    const [openIneligible, setOpenIneligible] = useState(false);
    const [ineligiblePeriods, setIneligiblePeriods] = useState();


    useEffect(() => {
        getAllIneligiblePeriods().then(resp => { setIneligiblePeriods(resp) }).catch(err => { console.error(err.message) })
    }, [])

    useEffect(() => { }, [ineligiblePeriods])


    function handleToggleIneligibles() {
        setOpenIneligible(!openIneligible)
    }

    function handleDeleteIneligible(id) {
        deleteIneligiblePeriod(id).then(resp => { console.log(resp) }).catch(err => { console.error(err.message) })

        let newIneligiblePeriods = ineligiblePeriods.forEach(ip => ip.ip_id !== id)

        setIneligiblePeriods(newIneligiblePeriods)
    }

    return (
        <div>
            <div className="settingsContent">
                <h1>Vacation settings</h1>
                <ListItem button onClick={() => handleToggleIneligibles()}>
                    <ListItemText>Ineligible periods</ListItemText>
                    {openIneligible ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openIneligible}>
                    <List>
                        {ineligiblePeriods ?
                            ineligiblePeriods.map((element) => {
                                return (
                                    <ListItem>
                                        <p className="m-0">
                                            Period: <em>{element.period_start} - {element.period_end} </em>
                                            Created by: <em>{element.created_by[0].name}</em>
                                        </p>
                                        <Button color="secondary" onClick={() => handleDeleteIneligible(element.ip_id)}>
                                            delete
                                        </Button>
                                    </ListItem>
                                )
                            })
                            : <em>There are no ineligible periods recorded yet...</em>}

                    </List>
                </Collapse>
                {/*<Button> Change max vacation period </Button> <br /> <br />
                <Button> Import vacation data (in JSON format) </Button> <br /> <br />
                <Button> Export vacation data (in JSON format) </Button>*/}
            </div>

        </div>
    )
}

export default VacationSettings;
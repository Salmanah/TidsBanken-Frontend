import React, { useEffect } from 'react';
import CalendarView from '../calendar-view/index';
import './main.css';
import { getCurrentUser, getAllUsers, getUserRequestsById, getAllIneligiblePeriods } from '../../utils/APIUtils';


function Main() {

    const [admin, setAdmin] = React.useState(null);
    const [myId, setMyId] = React.useState(null);
    const [vacationRequests, setVacationRequests] = React.useState(null);
    const [IneligiblePeriods, setIneligiblePeriods] = React.useState(null);

    const [allUsers, setAllUsers] = React.useState(null);

    useEffect(() => {
        getCurrentUser().then(resp => { setAdmin(resp.admin); setMyId(resp.id) })

        getAllUsers().then(resp => { setAllUsers(resp) });

        getAllIneligiblePeriods().then(resp => { setIneligiblePeriods(resp) });


    }, [])

    useEffect(() => {

        if (myId !== null) {

            getUserRequestsById(myId).then(resp => { setVacationRequests(resp) });
        }

    }, [myId])

    return (
        <>
            {vacationRequests !== null && admin !== null && allUsers !== null && myId !== null ? <CalendarView requests={vacationRequests} allUsers={allUsers} id={myId} admin={admin} ineligible={IneligiblePeriods} /> : null}
        </>
    )
}

export default Main;
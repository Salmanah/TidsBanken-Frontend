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
        getCurrentUser().then(resp => { setAdmin(resp.admin); setMyId(resp.id) }).catch(err => { console.error(err) })

        getAllUsers().then(resp => { setAllUsers(resp) }).catch(err => { console.error(err) })

        //getAllIneligiblePeriods().then(resp => { setIneligiblePeriods(resp) });


    }, [])

    useEffect(() => {

        if (myId !== null) {

            getUserRequestsById(myId).then(resp => { setVacationRequests(resp) }).catch(err => { console.error(err) })
        }

    }, [myId])

    return (
        <>
            {vacationRequests !== null && admin !== null && allUsers !== null && myId !== null ? <CalendarView requests={vacationRequests} allUsers={allUsers} id={myId} admin={admin} ineligible={IneligiblePeriods} /> : null}
        </>
    )
}

export default Main;
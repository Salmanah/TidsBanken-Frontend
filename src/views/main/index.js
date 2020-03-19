import React, { useEffect } from 'react';
import CalendarView from '../calendar-view/index';
import './main.css';
import { getCurrentUser, getAllUsers } from '../../utils/APIUtils';

function Main() {

    const [admin, setAdmin] = React.useState(null);
    const [myId, setMyId] = React.useState(null);

    const [allUsers, setAllUsers] = React.useState(null);

    useEffect(() => {
        getCurrentUser().then(resp => { setAdmin(resp.admin); setMyId(resp.id) })

        getAllUsers().then(resp => { setAllUsers(resp) });

    }, [])

    return (
        <>
            {admin !== null && allUsers !== null && myId !== null ? <CalendarView allUsers={allUsers} id={myId} admin={admin} /> : null}
        </>
    )
}

export default Main;
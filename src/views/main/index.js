import React, { useEffect } from 'react';
import CalendarView from '../calendar-view/index';
import './main.css';
import { getCurrentUser, getAllUsers } from '../../utils/APIUtils';

function Main() {

    const [admin, setAdmin] = React.useState(null);

    const [allUsers, setAllUsers] = React.useState(null);

    useEffect(() => {
        getCurrentUser().then(resp => { setAdmin(resp.admin) })

        getAllUsers().then(resp => { setAllUsers(resp) });

    }, [])

    return (
        <div>
            {admin !== null && allUsers !== null ? <CalendarView allUsers={allUsers} admin={admin} /> : null}
        </div>
    )
}

export default Main;
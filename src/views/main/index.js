import React, { useEffect } from 'react';
import CalendarView from '../calendar-view/index';
import './main.css';
import { getCurrentUser } from '../../utils/APIUtils';

function Main() {

    const [admin, setAdmin] = React.useState(null);

    useEffect(() => {
        getCurrentUser().then(resp => { setAdmin(resp.admin) })

    }, [])

    return (
        <div>
            {admin !== null ? <CalendarView admin={admin} /> : null}
        </div>
    )
}

export default Main;
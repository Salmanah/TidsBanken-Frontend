import React, { useEffect, useState } from 'react';
import CalendarView from '../calendar-view/index';
import './main.css';
import { getCurrentUser, getUserRequestAndApproved, getAllVacationRequestsAsAdmin, getUserRequestsById, getAllIneligiblePeriods } from '../../utils/APIUtils';

function Main(props) {

    const [admin, setAdmin] = useState(null);
    const [myId, setMyId] = useState(null);
    const [vacationRequests, setVacationRequests] = useState();
    const [IneligiblePeriods, setIneligiblePeriods] = useState();
    const [allUsers, setAllUsers] = useState();

    useEffect(() => {
        getCurrentUser().then(resp => { setAdmin(resp.admin); setMyId(resp.id) }).catch(err => { console.error(err) })
        getAllIneligiblePeriods().then(resp => { setIneligiblePeriods(resp) }).catch(err => { console.error(err.message) })

    }, [])

    useEffect(() => {
        let tmp = [];
        if (admin) {
            getAllVacationRequestsAsAdmin().then(resp => {

                resp.forEach(req => {
                    let user = { id: req.owner[0].id, name: req.owner[0].name }
                    tmp.push(user)
                })

                let uniqueUsers = removeDuplicatesBy(x => x.id, tmp);
                setAllUsers(uniqueUsers)

            }).catch(err => { console.error(err) })

        } else {
            // gets only approved vacation requests
            getUserRequestAndApproved().then(resp => {

                resp.forEach(req => {
                    let user = { id: req.owner[0].id, name: req.owner[0].name }
                    tmp.push(user)
                })

                let uniqueUsers = removeDuplicatesBy(x => x.id, tmp);
                setAllUsers(uniqueUsers)

            }).catch(err => { console.error(err) })
        }

    }, [admin])

    // get unique users by removing dublicates
    function removeDuplicatesBy(id, array) {

        var mySet = new Set();
        return array.filter(function (x) {
            var key = id(x), isNew = !mySet.has(key);
            if (isNew) mySet.add(key);
            return isNew;
        });
    }

    useEffect(() => {

        if (myId !== null) {

            getUserRequestsById(myId).then(resp => { setVacationRequests(resp) }).catch(err => { console.error(err) })
        }

    }, [myId])

    return (
        <>
            {admin !== null && myId !== null ? <CalendarView history={props.history} requests={vacationRequests} allUsers={allUsers} id={myId} admin={admin} ineligible={IneligiblePeriods} /> : null}
        </>
    )
}

export default Main;
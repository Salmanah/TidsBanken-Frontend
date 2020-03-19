import React, {useEffect} from "react";
import './vacationRequests.css';
import { List, Divider, CircularProgress } from '@material-ui/core';
import RequestListItem from '../../components/requestListItem/index';
import {getUserRequestAndApproved} from '../../utils/APIUtils';
import ToggleBox from '../../components/toggle-box/index';

const VacationRequests = (props) => {

    /*const [admin, setAdmin] = React.useState(null);

    useEffect(() => {
        getCurrentUser().then(resp => { setAdmin(resp.admin) })

    }, [])*/

    const [loading, setLoading] = React.useState(true);

    const [requests, setRequests] = React.useState([]);

    const [element, setElement] = React.useState(Object);

    var reqs = [];

    useEffect(()=>{
        
        console.log("gettin requests")
        getUserRequestAndApproved().then(resp => {
            resp.forEach(element => {
                reqs.push(element)
            })
            
            setRequests(reqs)
            setLoading(false)
        })
        
    },[])

    const status = ["Pending", "Approved", "Denied"]

    return (

        <div>
            {status.map((st, index)=>{
                return(<ToggleBox title={st}>
                    { loading ? (<CircularProgress/>)
                    : (
                        <div>
                            <List>
                                {requests.map((request, index) => {
                                    if (request.status[0].status === st) {
                                        return (
                                                <RequestListItem request={request} parentProps={props}/>
                                            )
                                        }
                                    }
                                )}
                            </List>
                        </div>
                    )
                    }
                </ToggleBox>)
            })}
            <ToggleBox title="all">
                <div>
                {loading ? (<CircularProgress/>)
                :(
                    <div>
                        <List>
                            {requests.map(
                                (request, index) => {
                                    return (
                                        <div>
                                            <RequestListItem request={request} parentProps={props} />
                                        </div>
                                    )
                                }
                            )}
                        </List>
                    </div>
                )} 
                </div>
            </ToggleBox>
        </div>
    )
}

export default VacationRequests;
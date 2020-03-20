import React, {useEffect} from "react";
import './vacationRequests.css';
import { List, CircularProgress } from '@material-ui/core';
import RequestListItem from '../../components/requestListItem/index';
import {getUserRequestAndApproved} from '../../utils/APIUtils';
import ToggleBox from '../../components/toggle-box/index';
 

const VacationRequests = (props) => {

    const [loading, setLoading] = React.useState(true);

    const [requests, setRequests] = React.useState([]);


    useEffect(()=>{
        
        getUserRequestAndApproved().then(resp => {
            setRequests(resp)
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
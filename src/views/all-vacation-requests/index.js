import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import RequestListItem from '../../components/request-list-item/index';
import {getAllVacationRequestsAsAdmin} from '../../utils/APIUtils';
import {FormControlLabel, FormControl, Radio, RadioGroup, FormLabel} from '@material-ui/core';

const AllVacationRequests = (props) => {

    console.log("props i all vacation request")
    console.log(props)

    const [requests, setRequests] = useState([]);
    const [radioValue, setRadioValue] = React.useState('showAll');
    const [filteredRequests, setFilteredRequests] = useState([])



    useEffect(()=>{
        getAllVacationRequestsAsAdmin()
        .then(resp => {
            console.log(resp)
            setRequests(resp);
            setFilteredRequests(resp);
            
        }).catch(err => {console.error(err)});
    },[])


    function handleChange(event){
        if (event.target.value === "approved"){
            setRadioValue("approved")
        } 
        else if (event.target.value === "pending"){
            setRadioValue("pending")
        }
        else if (event.target.value === "denied"){
            setRadioValue("denied")
        }
        else{
            setRadioValue("showAll")
        }
    }

    useEffect(()=>{

        if (radioValue === "approved"){

            let tempRequests = requests.filter(e=>{
                return e.status[0].status === "Approved"
            })

            setFilteredRequests(tempRequests)
        } 
        else if (radioValue === "pending"){
            let tempRequests = requests.filter(e=>{
                return e.status[0].status === "Pending"
            })
            setFilteredRequests(tempRequests)
        }
        else if (radioValue === "denied") {
            let tempRequests = requests.filter(e=>{
                return e.status[0].status === "Denied"
            })
            setFilteredRequests(tempRequests)
        } 
        else {
            setFilteredRequests(requests)
        }

    }, [radioValue])


    return(
        <Container>
            <Row>
            <Col  md={{ span: 8, offset: 2 }}>
            <h1>All vacation requests</h1>
                </Col>
            </Row>
            
            <Row>
                <Col  md={{ span: 8, offset: 2 }}>
                <FormControl>
                    <FormLabel>
                        <RadioGroup row  aria-label="status" name="status" value={radioValue} onChange={e => handleChange(e)}>
                        <FormControlLabel control={<Radio value="showAll"/> }label="Show all"/>
                        <FormControlLabel control={<Radio  value="approved" />}label="Approved"/>
                        <FormControlLabel control={<Radio  value="pending" />}label="Pending"/>
                        <FormControlLabel control={<Radio  value="denied" />}label="Denied"/>
                        </RadioGroup>
                    </FormLabel>
                </FormControl>
                </Col>
            </Row>
            <Row>
                <Col  md={{ span: 8, offset: 2 }}>
                    {filteredRequests.slice(0).reverse().map(element => {
                        return(
                            <RequestListItem parentProps={props} request={element} admin={props.currentUser.admin}/>
                        )
                    })}

                </Col>
            </Row>
        </Container>
    )
}

export default AllVacationRequests;
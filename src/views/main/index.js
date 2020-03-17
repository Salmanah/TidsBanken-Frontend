import React, { useEffect } from 'react';
import CalendarView from '../calendar-view/index';
import './main.css';
import { getCurrentUser } from '../../utils/APIUtils';



function Main() {

    const [admin, setAdmin] = React.useState(null);

    useEffect(() => {
        getCurrentUser()
            .then(response => {
                setAdmin(response.admin)
            }).catch(error => {
                console.log("ERROR HERE ", error)
            });

    }, [])


    return (
        <div>
            {admin !== null ? <CalendarView admin={admin} /> : null}
        </div>
    )
}

/*  const cookie = new Cookies();
  console.log(cookie.get('info').name)
  console.log(cookie.get('info').role)

/*  const cookie = new Cookies();
console.log(cookie.get('info').name)
console.log(cookie.get('info').role)

const role = cookie.get('info').role;

if (role === 'user'){
    return(
        <div className="Main">
            <ApplicationFrame/>
            <div className="contentContainer">
                <h1>Vacation planner</h1>
                <Link to="/CreateVacationRequest"><MDBBtn color="primary">Create vacation request</MDBBtn></Link>
                <Row>
                    <Col md={12}>
                        <Calendar />
                    </Col>
                </Row>
            </div>
            
        </div>
    )
} 
else if (role === 'admin'){
    return (
        <div className="Main"> 
         <ApplicationFrame/>
         <div className="contentContainer">
            <h1>Vacation planner</h1>
             <CreateIneligiblePeriod />
            <Row>
                <Col md={12}>
                    <Calendar />
                </Col>
            </Row>
         </div>
         
    </div>
    )
}
else {
    return(
       <div>
        Something wrong with role in cookie
    </div> 
    )
    
}*/


export default Main;
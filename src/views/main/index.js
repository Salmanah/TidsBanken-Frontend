import React from 'react';
import Calendar from "../../components/calendar";
import CalendarBadge from "../../components/calendar-badge/";
import CalendarSearchSelect from "../../components/calendar-search-select/";
import CalendarSwitch from "../../components/calendar-switch/";
import { Row, Col, Container } from "react-bootstrap";
import ApplicationFrame from '../../components/application-frame/index';
import CalendarLabel from '../../components/calendar-label/';
import VacationRequests from '../../views/vacation-requests/index';
import CreateIneligiblePeriod from '../../views/create-ineligible-period';
import { Link } from 'react-router-dom';
import CreateVacationRequest from '../../views/create-vacation-request/index';
import Cookies from 'universal-cookie';
import './main.css';



function Main() {

    const [selectedPeople, setSelectedPeople] = React.useState([
        { value: 'Ola Helgesen', label: 'Ola Helgesen' },
        { value: 'Heidi Furnes', label: 'Heidi Furnes' },
        { value: 'Åge Alexandersson', label: 'Åge Alexandersson' },
        { value: 'Arne Hoie', label: 'Arne Hoie' },
        { value: 'Hege Aarnes', label: 'Hege Aarnes' },
        { value: 'Ørjan Sagstuen', label: 'Ørjan Sagstuen' },
        { value: 'Pernille Frisli', label: 'Pernille Frisli' },
        { value: 'Cecilie Nordstrand', label: 'Cecilie Nordstrand' },
        { value: 'Rasmus Andersen', label: 'Rasmus Andersen' },
        { value: 'Marie Nes', label: 'Marie Nes' },
        { value: 'Suzanne Smith', label: 'Suzanne Smith' },
        { value: 'Cecilie Andersen', label: 'Cecilie Andersen' },
        { value: 'Phong Fui', label: 'Phong Fui' },
        { value: 'Kim-Andrè Mernes', label: 'Kim-Andrè Mernes' },
        { value: 'Ahmet Finasso', label: 'Ahmet Finasso' },
        { value: 'Henrik Eriksson', label: 'Henrik Eriksson' },
        { value: 'Anita Rud Rosenborg', label: 'Anita Rud Rosenborg' },
        { value: 'Espen Medlien', label: 'Espen Medlien' },
        { value: 'Jorunn Elisabeth Rud', label: 'Jorunn Elisabeth Rud' },
        { value: 'Torkel Medlien', label: 'Torkel Medlien' },
        { value: 'Marit Dybsand', label: 'Marit Dybsand' },
        { value: 'Carl-Emil Rud Engelberg', label: 'Carl-Emil Rud Engelberg' },
        { value: 'Tonje Athina Rud Engelberg', label: 'Tonje Athina Rud Engelberg' },
        { value: 'Dennis Rud Rosenborg', label: 'Dennis Rud Rosenborg' },
        { value: 'Daniel Medlien', label: 'Daniel Medlien' },
        { value: 'Ida Susanne Rud', label: 'Ida Susanne Rud' },
        { value: 'Malin Rud', label: 'Malin Rud' }
    ]);

    let selectedPeopleBadges = selectedPeople.map((person) => {
        return <CalendarBadge key={person.value} name={person.value} />
    });

    return (
        <div>
            <ApplicationFrame />
            <Container className="contentContainer">
                <Row>
                    <Col>
                        <h1>My calendar</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5 }}>
                        <CalendarSwitch />
                    </Col>
                    <Col md={{ span: 4 }}>
                        <CalendarSearchSelect />
                    </Col>
                </Row>
                <Row>
                    <Col className="mx-5 my-2 p-2">
                        {selectedPeopleBadges}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Calendar />
                    </Col>
                </Row>
                <Row>
                    <Col className="under-calendar mb-5">
                        <CalendarLabel />
                    </Col>
                </Row>
            </Container>



            {/* <Row>
                    <Col>
                        <h2 className="under-calendar">Hello</h2>
                        <p>here we will explain what all colors and icons mean and we should also list denied requests somehow</p>
                    </Col>
                </Row>*/}

        </div>
    )
}

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
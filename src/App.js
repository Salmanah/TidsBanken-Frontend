import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./views/main/";
import { Container } from "react-bootstrap";
import {MDBBtn} from 'mdbreact';

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import CreateVacationRequest from './views/create-vacation-request/index';
import ViewVacationRequest from './components/view-vacation-request/index';
import ViewRequestHistory from './components/vacation-request-history/index';
import CreateIneligiblePeriod from './views/create-ineligible-period/index';
import LoginPage from './views/login-page/index';
import UserProfile from './views/user-profile/index'
import ApplicationSettings from './views/application-settings/index';
import VacationRequests from './views/vacation-requests';
import Cookies from 'universal-cookie';
import Users from './views/users/index';
import VacationSettings from './views/vacation-settings/index';


function App() {

  const cookie = new Cookies();
  cookie.set('info', {'name':'Helene', 'role':'user'}); 


  return (
    <div>
      <Container className="App">
        <Router>
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route path="/UserProfile" component={UserProfile}/>
              <Route path="/CreateVacationRequest" component={CreateVacationRequest}/>
              <Route path="/ViewVacationRequest" component={ViewVacationRequest}/>
              <Route path="/ViewRequestHistory" component={ViewRequestHistory} />
              <Route path="/CreateIneligiblePeriod" component={CreateIneligiblePeriod}/>
              <Route path="/ApplicationSettings" component={ApplicationSettings}/>
              <Route path="/LoginPage" component={LoginPage}/>
              <Route path="/VacationRequests" component={VacationRequests}/>
              <Route path="/Users" component={Users}/>
              <Route path="/VacationSettings" component={VacationSettings}/>
            </Switch>
        </Router>
      </Container>
    
    </div>
  
  );
}

export default App;

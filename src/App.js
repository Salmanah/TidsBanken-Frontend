import React, {Component} from 'react';
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

import './App.css';


import { getCurrentUser } from './utils/APIUtils';
import { ACCESS_TOKEN } from './constants';
import PrivateRoute from './common/PrivateRoute';
import LoadingIndicator from './common/LoadingIndicator'; 
import OAuth2RedirectHandler from './user/oauth2/OAuth2RedirectHandler'
import Login from './user/login/Login'; 
import AppHeader from './common/AppHeader'
import Alert from 'react-s-alert';
import NotFound from './common/NotFound'; 
import Profile from './user/profile/Profile'; 


/*
function App() {

  const cookie = new Cookies();
  cookie.set('info', { 'name':'Helene', 'role':'admin'}); 
  


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
            </Switch>
        </Router>
      </Container>
    
    </div>
  
  );
}

export default App;
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false
      });
    }).catch(error => {
      this.setState({
        loading: false
      });  
    });    
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    Alert.success("You're safely logged out!", this.state.authenticated);
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if(this.state.loading) {
      return <LoadingIndicator />
    }

    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
        </div>
        <div className="app-body">
          <Router>
            <Switch>
              <Route exact path="/" component={Main}></Route>           
              <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                component={Profile}></PrivateRoute>
              <Route path="/login"
                render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
                <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route> 
                <Route component={NotFound}></Route>
            </Switch>
          </Router>
          
        </div>
      </div>
    );
  }
}

export default App; 

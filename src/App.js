import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./views/main/";
import { Container } from "react-bootstrap";
import { MDBBtn } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CreateVacationRequest from './views/create-vacation-request/index';
import ViewVacationRequest from './components/view-vacation-request';
import ViewRequestHistory from './components/vacation-request-history/index';
import CreateIneligiblePeriod from './views/create-ineligible-period/index';

import ApplicationSettings from './views/application-settings/index';
import VacationRequests from './views/vacation-requests';


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
import UserProfile from './views/user-profile/index';


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
    if (this.state.loading) {
      return <LoadingIndicator />
    }

    console.log("elissi", this.state.authenticated)

    return (
      <div className="app">
        <Router>
          <div className="app-top-box">
            <AppHeader authenticated={this.state.authenticated} currentUser={this.state.currentUser} onLogout={this.handleLogout} />
          </div>
          <div className="app-body">
            <Switch>

              {this.state.authenticated ?
                (<Route exact path="/" component={Main}></Route>)
                :
                (<Route exact path="/" component={Login}></Route>)}

              <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={Profile} />
              <Route path="/login" render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
              <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
              <PrivateRoute path="/VacationRequests" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={VacationRequests} />
              <PrivateRoute path="/CreateVacationRequest" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={CreateVacationRequest} />
              <PrivateRoute path="/ViewVacationRequest" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={ViewVacationRequest} />
              <PrivateRoute path="/ViewRequestHistory" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={ViewRequestHistory} />
              <PrivateRoute path="/CreateIneligiblePeriod" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={CreateIneligiblePeriod} />
              <PrivateRoute path="/ApplicationSettings" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={ApplicationSettings} />
              <PrivateRoute path="/VacationRequests" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={VacationRequests} />
              <PrivateRoute path="/UserProfile" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={UserProfile} />
              <Route component={NotFound}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App; 

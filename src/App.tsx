import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateVacationRequest from './views/CreateVacationRequest';
import ViewVacationRequest from './views/ViewVacationRequest';
import Main from './views/Main';

import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" component={Main}></Route>
          <Route path="/CreateVacationRequest" component={CreateVacationRequest}></Route>
          <Route path="/ViewVacationRequest" component={ViewVacationRequest}></Route>
        </Switch>
    </Router>
  );
}

export default App;

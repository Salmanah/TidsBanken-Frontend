import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./views/main/";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="App">
      <Main />
    </Container>
  );
}

export default App;

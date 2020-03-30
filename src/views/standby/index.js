import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './standby.css';

const Standby = () => {
    return(
            <div className="standbyText">
                <h1>Tidsbanken vacation planner</h1>
                <p>Ooops.. it seems your e-mail have not been verified by an administrator yet.</p>
                <p>Please wait or contact your administrator to proceed.</p>
            </div>
        )
}

export default Standby;
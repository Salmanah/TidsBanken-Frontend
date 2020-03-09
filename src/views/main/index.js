import React from 'react';
import Calendar from "../../components/calendar";
import { Row, Col } from "react-bootstrap";



function Main() {

    const style = {
        position: "relative",
        margin: "50px auto"
    }
    return (
        <div className="Main">
            <Row>
                <Col md={12}>
                    <Calendar style={style} key="calendar"
                        onDayClick={(e, day) => this.onDayClick(e, day)} />
                </Col>
            </Row>
        </div>
    );
}

export default Main;
import React, { useEffect } from "react";
import moment from "moment";
import "./Calendar.css";
import { Col, Row } from "react-bootstrap";
import { Badge } from '@material-ui/core/';
import { People, ThreeDRotation } from '@material-ui/icons';

/*
    Credit: 
    Core functionality of calendar component is taken from Mosh Hamedani's tutorial:
        https://programmingwithmosh.com/react/build-a-react-calendar-component-from-scratch/
    Hamedani's tutorial is based on Rajesh Pillai's tutorial: 
        https://www.youtube.com/watch?v=9U0uTNfY1UA&list=PLNIn9uF_2Il5xOLikexgi_yuG2f-LjInP
*/

function Calendar() {
    const [showYearTable, setShowYearTable] = React.useState(false);
    const [showMonthTable, setShowMonthTable] = React.useState(false);
    const [showDateTable, setShowDateTable] = React.useState(true);
    const [dateObject, setDateObject] = React.useState(moment());
    const [allmonths, setAllmonths] = React.useState(moment.months());
    const [selectedDay, setSelectedDay] = React.useState(null);
    const [weekdayshort, setWeekdayshort] = React.useState(moment.weekdaysShort());

    const [count, setCount] = React.useState(0);

    useEffect(() => {
        ineligibleVacation();
        approvedVacation();
        pendingVacation();
        //console.log(count);
    }, [count, dateObject]);                // using a counter to trigger the render
    // because it doesn't render on changes to the dateObject on next() and prev()

    function daysInMonth() {
        return dateObject.daysInMonth();
    };
    function year() {
        return dateObject.format("Y");
    };

    // returns today's number of day for each month
    function currentDay() {
        return dateObject.format("D");
    };

    function firstDayOfMonth() {
        let firstDay = moment(dateObject)
            .startOf("month")
            .format("d"); // Day of week 0...1..5...6
        return firstDay;
    };

    function month() {
        return dateObject.format("MMMM"); // Month 'March', 'April', 'May'
    };

    function showMonth(e, month) {
        setShowMonthTable(!showMonthTable)
        setShowDateTable(!showDateTable)
    };

    function setMonth(month) {
        //console.log(month)
        let monthNo = allmonths.indexOf(month);
        let newDateObject = Object.assign({}, dateObject);
        newDateObject = moment(newDateObject).set("month", monthNo);

        setDateObject(newDateObject)
        setShowMonthTable(!showMonthTable)
        setShowDateTable(!showDateTable)
    };

    function MonthList(props) {
        let months = [];
        props.data.map(data => {
            return months.push(
                <td
                    key={data}
                    className="calendar-month"
                    onClick={e => {
                        setMonth(data);
                    }}
                >
                    <span>{data}</span>
                </td>
            );
        });
        let rows = [];
        let cells = [];

        months.forEach((row, i) => {
            if (i % 3 !== 0 || !i) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
        });
        rows.push(cells);
        let monthlist = rows.map((d, i) => {
            return <tr key={Math.random()}>{d}</tr>;
        });

        return (
            <table className="calendar-month">
                <thead>
                    <tr>
                        <th colSpan="4">Select a Month</th>
                    </tr>
                </thead>
                <tbody>{monthlist}</tbody>
            </table>
        );
    };
    function showYearTablee(e) {
        setShowYearTable(!showYearTable);
        setShowDateTable(!showDateTable);
    };

    function onPrev() {

        let curr = "";
        if (showYearTable) {
            curr = "year";
        } else {
            curr = "month";
        }

        let prevMonth = dateObject.subtract(1, curr);
        setDateObject(prevMonth);
        setCount(count + 1);
    };

    function onNext() {

        let curr = "";
        if (showYearTable) {
            curr = "year";

        } else {
            curr = "month";
        }

        let nextMonth = dateObject.add(1, curr);
        setDateObject(nextMonth);
        setCount(count + 1);
    };

    function setYear(year) {

        let dateObject = Object.assign({}, dateObject);
        dateObject = moment(dateObject).set("year", year);

        setDateObject(dateObject)
        setShowMonthTable(!showMonthTable)
        setShowYearTable(!showYearTable)

    };

    function onYearChange(e) {
        setYear(e.target.value);
    };

    function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        stopDate = moment(stopDate);
        while (currentDate <= stopDate) {

            if (typeof startDate == 'object') { //small hack to separate the dates in calendar from the ones from vacations
                dateArray.push(moment(currentDate).format("YYYY"));
                currentDate = moment(currentDate).add(1, "year");
            } else {
                dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
                currentDate = moment(currentDate).add(1, 'days');
            }
        }
        return dateArray;
    }

    function YearTable(props) {
        let months = [];
        let nextten = moment()
            .set("year", props)
            .add("year", 12)
            .format("Y");

        let tenyear = getDates(props, nextten);

        tenyear.map(data => {
            return months.push(
                <td
                    key={data}
                    className="calendar-month"
                    onClick={e => {
                        setYear(data);
                    }}
                >
                    <span>{data}</span>
                </td>
            );
        });
        let rows = [];
        let cells = [];

        months.forEach((row, i) => {
            if (i % 3 !== 0 || !i) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
        });
        rows.push(cells);
        let yearlist = rows.map((d, i) => {
            return <tr key={Math.random()}>{d}</tr>;
        });

        return (
            <table className="calendar-month">
                <thead>
                    <tr>
                        <th colSpan="4">Select a Year</th>
                    </tr>
                </thead>
                <tbody>{yearlist}</tbody>
            </table>
        );
    };

    function onDayClick(e, d) {     //get the day you click on in calendar

        setSelectedDay(d);
        console.log("SELECTED DAY: ", selectedDay);
    };

    function ineligibleVacation() {

        let ineligibledays = [];
        let mm = dateObject.month() + 1;

        // the period that is ineligible for vacation
        let ineligible = getDates("2020-03-3", "2020-03-7");

        ineligible.forEach(element => {
            let el = element.split("-");
            // eslint-disable-next-line
            if (el[1] == mm && el[0] === year()) {
                ineligibledays.push(el[2]);
            }
        });

        if (ineligibledays.length > 0) {
            showIneligibleVacation(ineligibledays, mm);
        } else { // for some reason the calendar does not always update the vacations on next() and prev() 
            let el = document.getElementsByClassName("calendar-day");
            for (let i = 0; i < el.length; i++) {

                if (!el[i].className.includes("empty")) {
                    if (
                        el[i].className.includes("ineligible") ||
                        el[i].className.includes("approved") ||
                        el[i].className.includes("pending")) {
                        el[i].className = "calendar-day";
                    }
                }
            }
        }
    }

    // adds class 'illegiable' to days that are illegiable for vacation
    function showIneligibleVacation(ineligibledays, month) {

        ineligibledays.forEach(day => {

            if (day < 10) {
                day = day.split("");
                day = day[1];
            }

            let showDay = document.getElementById(`day${day}${month}${year()}`);

            if (showDay !== null) {
                showDay.classList.add('ineligible');;
            }
        });
    }

    function approvedVacation() {
        let approvedDays = [];
        let month = dateObject.month() + 1;
        // the period that is approved for vacation
        let approved = getDates("2020-3-10", "2020-3-15");

        approved.forEach(element => {
            let el = element.split("-");
            // eslint-disable-next-line
            if (el[1] == month && el[0] === year()) {
                approvedDays.push(el[2]);
            }
        });

        if (approvedDays.length > 0) {
            showApprovedVacation(approvedDays, month);
        } else {
            let el = document.getElementsByClassName("calendar-day");

            for (let i = 0; i < el.length; i++) {

                if (!el[i].className.includes("empty")) {
                    if (el[i].className.includes("approved")) {
                        el[i].className = "calendar-day";
                    }
                }
            }
        }
    }

    // adds class 'approved' to days that are approved for vacation
    function showApprovedVacation(approvedDays, month) {
        approvedDays.forEach(day => {

            if (day < 10) {
                day = day.split("");
                day = day[1];
            }

            let showDay = document.getElementById(`day${day}${month}${year()}`);

            if (showDay !== null) {
                showDay.classList.add('approved');;
            }
        });
    }

    // function for pending vacation 
    function pendingVacation() {
        let pendingDays = [];
        let month = dateObject.month() + 1;
        // the period that is ineligible for vacation
        let pending = getDates("2020-03-24", "2020-05-20");

        pending.forEach(element => {
            let el = element.split("-");
            // eslint-disable-next-line
            if (el[1] == month && el[0] === year()) {

                pendingDays.push(el[2]); // push days
            }
        });

        if (pendingDays.length > 0) {
            showPendingVacation(pendingDays, month);

        } else {
            let el = document.getElementsByClassName("calendar-day");
            for (let i = 0; i < el.length; i++) {

                if (!el[i].className.includes("empty")) {
                    if (el[i].className.includes("pending")) {
                        el[i].className = "calendar-day";
                    }
                }
            }
        }
    }

    // adds class 'pending' to days that are pending for vacation
    function showPendingVacation(pendingDays, month) {
        pendingDays.forEach(day => {

            if (day < 10) {
                day = day.split("");
                day = day[1];
            }

            let showDay = document.getElementById(`day${day}${month}${year()}`);

            if (showDay !== null) {
                //console.log(showDay)
                showDay.classList.add('pending');;
            }
        });
    }

    let weekdayshortname = weekdayshort.map(day => {
        return <th key={day}>{day}</th>;
    });
    let blanks = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
        blanks.push(<td key={Math.random()} className="calendar-day empty">{""}</td>);
    }
    let daysInMonthArray = [];

    for (let d = 1; d <= daysInMonth(); d++) {


        // eslint-disable-next-line 
        //let currentDay;
        //currentDay = d == currentDay() ? "today" : "";
        let mm = moment().month(month()).format("M");

        //console.log(mm, moment().month())

        daysInMonthArray.push(
            <td id={`day${d}${mm}${year()}`} key={d} className="calendar-day">
                <span className="float-left pl-3"
                    onClick={e => {
                        onDayClick(e, d);
                    }}
                >
                    {d}

                </span>
                <span className="float-right pr-3">
                    <Badge color="secondary" overlap="circle" badgeContent="2">
                        <People />
                    </Badge>
                </span>

            </td>
        );
    }

    var totalSlots = [...blanks, ...daysInMonthArray];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(row);
        }
        if (i === totalSlots.length - 1) {
            // let insertRow = cells.slice();
            rows.push(cells);
        }
    });

    let daysinmonthArray = rows.map((d, i) => {
        return <tr key={d + i}>{d}</tr>;
    });

    return (
        <div>
            <div className="tail-datetime-calendar mb-2 mt-2">

                <div className="calendar-navi">
                    <span
                        onClick={e => {
                            onPrev();
                        }}
                        className="calendar-button button-prev"
                    />
                    {!showMonthTable && (
                        <span
                            onClick={e => {
                                showMonth();
                            }}
                            className="calendar-label"
                        >
                            {month()}
                        </span>
                    )}
                    <span className="calendar-label" onClick={e => showYearTablee()}>
                        {year()}
                    </span>
                    <span
                        onClick={e => {
                            onNext();
                        }}
                        className="calendar-button button-next"
                    />
                </div>

                <div className="calendar-date">
                    {showYearTable && <YearTable props={year()} />}
                    {showMonthTable && (
                        <MonthList data={moment.months()} />
                    )}
                </div>

                {showDateTable && (
                    <div className="calendar-date">
                        <table className="calendar-day">
                            <thead>
                                <tr>{weekdayshortname}</tr>
                            </thead>
                            <tbody>{daysinmonthArray}</tbody>
                        </table>
                    </div>
                )}
            </div>
        </div >
    );
}

export default Calendar;
import React, { useEffect } from "react";
import moment from "moment";
import "./Calendar.css";
import { Collapse } from 'react-bootstrap';
import { printDate } from '../../utils/common.js'
/*
    Credit: 
    Core functionality of calendar component is taken from Mosh Hamedani's tutorial:
        https://programmingwithmosh.com/react/build-a-react-calendar-component-from-scratch/
    Hamedani's tutorial is based on Rajesh Pillai's tutorial: 
        https://www.youtube.com/watch?v=9U0uTNfY1UA&list=PLNIn9uF_2Il5xOLikexgi_yuG2f-LjInP
*/

function Calendar(props) {
    const [showYearTable, setShowYearTable] = React.useState(false);
    const [showMonthTable, setShowMonthTable] = React.useState(false);
    const [showDateTable, setShowDateTable] = React.useState(true);
    const [dateObject, setDateObject] = React.useState(moment());
    const [allmonths] = React.useState(moment.months());
    const [selectedDay, setSelectedDay] = React.useState(null);
    const [weekdayshort] = React.useState(moment.weekdaysShort());

    const [count, setCount] = React.useState(0); //fix --> do i need this anymore?

    const [pending, setPending] = React.useState([]);
    const [approved, setApproved] = React.useState([]);
    const [denied, setDenied] = React.useState([]);
    const [ineligible, setIneligible] = React.useState([]);

    const [allSelectedUserVacations, setAllSelectedUserVacations] = React.useState([]);



    useEffect(() => {

        ineligibleVacation();

        if (!props.checked) {
            pendingVacation()
            approvedVacation()
            deniedVacation()
        } else {
            userVacations();
        }

    },
        /*
            React Hook useEffect has missing dependencies: 
            'approvedVacation', 
            'deniedVacation', 
            'ineligibleVacation', 
            'pendingVacation', 
            and 'userVacations'
        */

        // eslint-disable-next-line react-hooks/exhaustive-deps  
        [props]);

    /* useEffect(() => {
         console.log("state", allSelectedUserVacations);
         console.log("props", props.allSelectedUserVacations)
     }, [allSelectedUserVacations, props.allSelectedUserVacations])*/

    function userVacations() {
        let tmp = [];
        if (props.allSelectedUserVacations) {
            props.allSelectedUserVacations.forEach(vac => {
                let vacation =
                {
                    dates: getDates(vac.period_start, vac.period_end),
                    id: vac.owner[0].id,
                    req_id: vac.request_id,
                    name: vac.owner[0].name,
                    title: vac.title,
                    status: vac.status[0].status,
                    duration: [vac.period_start, vac.period_end],
                    openCollapse: false
                }
                tmp.push(vacation)
            });
            setAllSelectedUserVacations(tmp)
        }
    }



    function ineligibleVacation() {
        let alltmp = [];
        let tmp = [];
        if (props.ineligible) {
            props.ineligible.forEach(date =>
                tmp.push(getDates(date.start, date.end))
            );
        }

        for (let i = 0; i < tmp.length; i++) {
            tmp[i].forEach(element =>
                alltmp.push(element)
            );
        }
        setIneligible(alltmp)

    }

    function deniedVacation() {
        let tmp = [];

        if (props.denied) {
            props.denied.forEach(date => {
                let obj = {
                    dates: getDates(date.start, date.end),
                    title: date.title,
                    all: date.all
                }
                tmp.push(obj)
            });
            setDenied(tmp)
        }
    }
    function pendingVacation() {

        let tmp = [];
        if (props.pending) {
            props.pending.forEach(date => {
                let obj = {
                    dates: getDates(date.start, date.end),
                    title: date.title,
                    all: date.all
                }
                tmp.push(obj)
            });
            setPending(tmp)
        }
    }

    function approvedVacation() {
        let tmp = [];
        if (props.approved) {
            props.approved.forEach(date => {
                let obj = {
                    dates: getDates(date.start, date.end),
                    title: date.title,
                    all: date.all
                }
                tmp.push(obj)
            });
            setApproved(tmp)
        }
    }
    function daysInMonth() {
        return dateObject.daysInMonth();
    };
    function year() {
        return dateObject.format("Y");
    };

    // returns today's number of day for each month
    /*function currentDay() {
        return dateObject.format("D");
    };*/

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

        let newDateObject = Object.assign({}, dateObject);
        newDateObject = moment(newDateObject).set("year", year);

        setDateObject(newDateObject)
        setShowMonthTable(!showMonthTable)
        setShowYearTable(!showYearTable)

    };

    function getDates(startDate, stopDate) {
        var dateArray = [];

        if (typeof startDate == 'object') {  //small hack to separate the dates in calendar from the ones from vacations
            let currentDate = moment(startDate);
            stopDate = moment(stopDate, "YYYY");

            while (currentDate <= stopDate) {

                dateArray.push(moment(currentDate).format("YYYY"));
                currentDate = moment(currentDate).add(1, "year");
            }
            return dateArray;

        } else if (typeof startDate == 'string') {
            let currentDate = moment(startDate, 'YYYY-MM-DD');
            stopDate = moment(stopDate, 'YYYY-MM-DD');
            while (currentDate <= stopDate) {
                dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
                currentDate = moment(currentDate).add(1, 'days');
            }
            return dateArray;
        }
    }

    function YearTable(props) {
        let months = [];
        let nextten = moment()
            .set("year", props)
            .add(12, "year")
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
            <table className="calendar-year">
                <thead>
                    <tr>
                        <th colSpan="4">Select a Year</th>
                    </tr>
                </thead>
                <tbody>{yearlist}</tbody>
            </table>
        );
    };

    function openCollapse(id) {
        allSelectedUserVacations.forEach(vac => {
            if (vac.req_id === id) {
                vac.openCollapse = !vac.openCollapse
                setCount(count + 1)
            }
        })
    }

    function redirectToVacationRequestHistory(user) {
        props.history.push({
            pathname: "/VacationRequestHistory",
            state: {
                user: user
            }
        })
    }

    function onDayClick(e, d) {     //get the day you click on in calendar

        setSelectedDay(d);
        console.log("SELECTED DAY: ", selectedDay);
    };

    function RedirectToViewVacationRequest(vacation) {

        props.history.push({
            pathname: "/ViewVacationRequest",
            state: {
                request: vacation.all
            }
        })
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

        if (d < 10) {
            d = '0' + d;
        }
        let mm = moment().month(month()).format("MM");

        let userDetails = [];

        allSelectedUserVacations.forEach(vac => {
            if (props.checked || props.admin) {
                if (vac.dates.includes(year() + "-" + mm + "-" + d)) {
                    let startDate = printDate(vac.duration[0])
                    let endDate = printDate(vac.duration[1])
                    let status = vac.status.toLowerCase();
                    userDetails.push(
                        <div key={vac.id} className={`selectedVacation ${status}`} onClick={() => openCollapse(vac.req_id)}
                            aria-controls={`vacation-request-${vac.id}-collapse`}
                            aria-expanded={vac.openCollapse}>
                            {`${vac.name}: `}
                            <em>{vac.title}</em><br />
                            <Collapse in={vac.openCollapse}>
                                <div id={`vacation-request-${vac.id}-collapse`} className="pt-1 text-center">
                                    <em >{startDate} - {endDate}</em>
                                    <button className="calendar-redirect" onClick={() => redirectToVacationRequestHistory(vac)}>View request history</button>
                                </div>
                            </Collapse>
                        </div>
                    );
                }
            }
        });

        let status = "";
        let title = [];

        if (!props.checked) {
            pending.forEach(pend => {
                if (pend.dates.includes(year() + "-" + mm + "-" + d)) {
                    status = "pending";
                    title.push(
                        <button className="calendar-redirect" key={pend.title} onClick={() => RedirectToViewVacationRequest(pend)}>
                            <em>{pend.title}</em>
                        </button>);

                }
            });
            approved.forEach(appr => {
                if (appr.dates.includes(year() + "-" + mm + "-" + d)) {
                    status = "approved";
                    title.push(
                        <button className="calendar-redirect" key={appr.title} onClick={() => RedirectToViewVacationRequest(appr)}>
                            <em>{appr.title}</em>
                        </button>);
                }
            });
            denied.forEach(den => {
                if (den.dates.includes(year() + "-" + mm + "-" + d)) {
                    status = "denied";
                    title.push(
                        <button className="calendar-redirect" key={den.title} onClick={() => RedirectToViewVacationRequest(den)}>
                            <em>{den.title}</em>
                        </button>);
                }
            });
        }

        if (ineligible.includes(year() + "-" + mm + "-" + d)) {
            status = "ineligible"

        }


        // eslint-disable-next-line 
        //let currentDay;
        //currentDay = d == currentDay() ? "today" : "";


        //console.log(mm, moment().month())

        daysInMonthArray.push(

            <td id={`${year()}-${mm}-${d}`} key={d} className={`calendar-day ${status}`}>
                {/*`day${d}-${mm}-${year()}` === */}
                <span className="float-left px-1"
                    onClick={e => {
                        onDayClick(e, d);
                    }}
                >
                    {d}

                </span>
                <div>
                    <p className="myReqTitle">{title}</p>
                    <div className="userVacation text-left">
                        {userDetails}
                    </div>
                </div>
            </td >
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
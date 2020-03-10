import React from "react";
import moment from "moment";
import "./Calendar.css";
export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef(null);
    }
    weekdayshort = moment.weekdays();

    state = {
        showYearTable: false,
        showMonthTable: false,
        showDateTable: true,
        dateObject: moment(),
        allmonths: moment.months(),
        selectedDay: null
    };

    componentDidMount() {
        this.ineligibleVacationDays();
        //this.MyVacationDays();
    }

    componentDidUpdate() {
        this.ineligibleVacationDays();
    }

    daysInMonth = () => {
        return this.state.dateObject.daysInMonth();
    };
    year = () => {
        return this.state.dateObject.format("Y");
    };
    currentDay = () => {
        return this.state.dateObject.format("D");
    };
    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject)
            .startOf("month")
            .format("d"); // Day of week 0...1..5...6
        return firstDay;
    };
    month = () => {
        return this.state.dateObject.format("MMMM");
    };
    showMonth = (e, month) => {
        this.setState({
            showMonthTable: !this.state.showMonthTable,
            showDateTable: !this.state.showDateTable
        });
    };
    setMonth = month => {
        console.log(month)
        let monthNo = this.state.allmonths.indexOf(month);
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", monthNo);
        this.setState({
            dateObject: dateObject,
            showMonthTable: !this.state.showMonthTable,
            showDateTable: !this.state.showDateTable
        });
    };
    MonthList = props => {
        let months = [];
        props.data.map(data => {
            return months.push(
                <td
                    key={data}
                    className="calendar-month"
                    onClick={e => {
                        this.setMonth(data);
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
    showYearTable = e => {
        this.setState({
            showYearTable: !this.state.showYearTable,
            showDateTable: !this.state.showDateTable
        });
    };

    onPrev = (month) => {

        //let month = 1;
        //month = moment().month(month).format("MMMM")
        //let monthNo = this.state.allmonths.indexOf("June");
        let monthIndex = this.state.allmonths.indexOf(month);

        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", monthIndex - 1);
        console.log(dateObject)
        this.setState({
            dateObject: dateObject
        });
        console.log(month)
        this.componentDidUpdate()


        /*month = moment().month(month).format("M");
        month = month - 2;
        month = moment().month(month).format("M");

        month = moment().month(month - 1).format("MMMM")
        console.log(month)
        this.setMonth(month)*/

        //this.setMonth
        //let months = [];
        //props.map(data => {
        /* console.log(data)
         console.log(this.state.dateObject.month() - 1);
         return months.push(

             this.setMonth("December")

         );*/


        /*let curr = "";
        if (this.state.showYearTable === true) {
            curr = "year";
        } else {
            curr = "month";
 
        }
        this.setState({
            dateObject: this.state.dateObject.subtract(1, curr)
        });
        this.forceUpdate();*/

    };
    onNext = () => {

        let curr = "";
        if (this.state.showYearTable === true) {
            curr = "year";

        } else {
            curr = "month";
        }
        this.setState({
            dateObject: this.state.dateObject.add(1, curr)
        });
        this.forceUpdate();

    };
    setYear = year => {
        // alert(year)
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("year", year);
        this.setState({
            dateObject: dateObject,
            showMonthTable: !this.state.showMonthTable,
            showYearTable: !this.state.showYearTable
        });
    };
    onYearChange = e => {
        this.setYear(e.target.value);
    };

    getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        stopDate = moment(stopDate);
        while (currentDate <= stopDate) {

            if (typeof startDate == 'object') {
                dateArray.push(moment(currentDate).format("YYYY"));
                currentDate = moment(currentDate).add(1, "year");
            } else {
                dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
                currentDate = moment(currentDate).add(1, 'days');
            }
        }
        return dateArray;
    }

    YearTable = props => {
        let months = [];
        let nextten = moment()
            .set("year", props)
            .add("year", 12)
            .format("Y");

        let tenyear = this.getDates(props, nextten);

        tenyear.map(data => {
            return months.push(
                <td
                    key={data}
                    className="calendar-month"
                    onClick={e => {
                        this.setYear(data);
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
                        <th colSpan="4">Select a Yeah</th>
                    </tr>
                </thead>
                <tbody>{yearlist}</tbody>
            </table>
        );
    };
    onDayClick = (e, d) => {
        this.setState(
            {
                selectedDay: d
            },
            () => {
                console.log("SELECTED DAY: ", this.state.selectedDay);
            }
        );
    };

    // function for ineligible vacation days
    ineligibleVacationDays = () => {
        let ineligibledays = [];
        let mm = this.state.dateObject.month() + 1;
        // the period that is ineligible for vacation
        let ineligible = this.getDates("2020-02-3", "2020-03-7");

        ineligible.forEach(element => {
            let el = element.split("-");
            // eslint-disable-next-line
            if (el[1] == mm && el[0] === this.year()) {
                ineligibledays.push(el[2]);
            }
        });

        if (ineligibledays.length > 0) {
            this.getIneligibleVacationDays(ineligibledays, mm);
        }
    }

    // adds class 'illegiable' to days that are illegiable for vacation
    getIneligibleVacationDays = (ineligibledays, mm) => {
        ineligibledays.forEach(element => {

            if (element < 10) {
                element = element.split("");
                element = element[1];
            }

            let day = document.getElementById(`day${element}${mm}${this.year()}`);
            //console.log(`day${element}${mm}${this.year()}`)

            if (day !== null) {
                day.classList.add('ineligible');;
            }
        });
    }

    render() {
        let weekdayshortname = this.weekdayshort.map(day => {
            return <th key={day}>{day}</th>;
        });
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={Math.random()} className="calendar-day empty">{""}</td>);
        }
        let daysInMonth = [];

        for (let d = 1; d <= this.daysInMonth(); d++) {

            console.log(this.year())

            // eslint-disable-next-line 
            let currentDay = d == this.currentDay() ? "today" : "";
            let mm = moment().month(this.month()).format("M");

            //console.log(mm, moment().month())

            daysInMonth.push(
                <td id={`day${d}${mm}${this.year()}`} key={d} className={`calendar-day ${currentDay}`}>
                    <span className="float-left pl-3"
                        onClick={e => {
                            this.onDayClick(e, d);
                        }}
                    >
                        {d}
                    </span>
                </td>
            );
        }

        var totalSlots = [...blanks, ...daysInMonth];
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

        let daysinmonth = rows.map((d, i) => {
            return <tr key={d + i}>{d}</tr>;
        });

        return (
            <div className="tail-datetime-calendar">
                <div className="calendar-navi">
                    <span
                        onClick={e => {
                            this.onPrev(this.month());
                        }}
                        className="calendar-button button-prev"
                    />
                    {!this.state.showMonthTable && (
                        <span
                            onClick={e => {
                                this.showMonth();
                            }}
                            className="calendar-label"
                        >
                            {this.month()}
                        </span>
                    )}
                    <span className="calendar-label" onClick={e => this.showYearTable()}>
                        {this.year()}
                    </span>
                    <span
                        onClick={e => {
                            this.onNext();
                        }}
                        className="calendar-button button-next"
                    />
                </div>

                <div className="calendar-date">
                    {this.state.showYearTable && <this.YearTable props={this.year()} />}
                    {this.state.showMonthTable && (
                        <this.MonthList data={moment.months()} />
                    )}
                </div>

                {this.state.showDateTable && (
                    <div className="calendar-date">
                        <table className="calendar-day">
                            <thead>
                                <tr>{weekdayshortname}</tr>
                            </thead>
                            <tbody>{daysinmonth}</tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}

import moment from "moment";

export function printDate(date) {
    let el = date.split("-");
    let day = el[2];
    let month = el[1];
    let year = el[0].substring(2, 4);

    let newString = day + "/" + month + "/" + year;
    return newString;

}

export function getDates(startDate, stopDate) {
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

export function getNumberOfVacationDaysSpent(requests) {

    let tmp = [];
    let length = 0;
    if (requests.length > 0) {
        requests.forEach(req => {
            if (req.status[0].status !== 'Denied') {
                tmp.push(getDates(req.period_start, req.period_end))
            }
        });

        if (tmp.length > 0) {
            tmp.forEach(date => {
                length += date.length;
            })
        }
    }

    return length;
}

export function getRemainingVacationDays(total, spent) {
    return (total - spent);
}


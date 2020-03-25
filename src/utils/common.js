export function printDate(date) {
    let el = date.split("-");
    let day = el[2];
    let month = el[1];
    let year = el[0].substring(2, 4);

    let newString = day + "/" + month + "/" + year;
    return newString;

}
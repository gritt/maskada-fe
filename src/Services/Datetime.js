/**
 * @return {string}
 */
function GetMonthName(datetime) {
    const date = new Date(datetime);
    const longMonth = date.toLocaleString('default', {month: 'long'});
    const shortenYear = date.getFullYear().toString().substr(-2);

    return longMonth + " " + shortenYear
}

/**
 * @return {boolean}
 */
function IsCurrent(month) {
    return month === GetMonthName(Date.now());
}

export {GetMonthName, IsCurrent}
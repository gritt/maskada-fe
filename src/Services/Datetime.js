/**
 * @return {string}
 */
function GetMonthName(datetime) {
    const date = new Date(datetime);
    const longMonth = date.toLocaleString('default', {month: 'long'});
    const shortenYear = date.getFullYear().toString().substr(-2);

    return longMonth + " " + shortenYear
}

export {GetMonthName}
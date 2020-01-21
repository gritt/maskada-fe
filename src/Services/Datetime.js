/**
 * @return {string}
 */
function GetMonthName(datetime) {
    const date = new Date(datetime);
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear().toString().substr(-2);

    return month + " " + year
}

export {GetMonthName}
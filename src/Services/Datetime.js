/**
 * @return {string}
 */
function GetMonthName(datetime) {
    const date = new Date(datetime)
    const month = date.toLocaleString('en-US', {month: 'long'})
    const year = date.getFullYear().toString().substr(-2)

    return month + " " + year
}

/**
 * @return {string}
 */
function GetPreviousMonthName(monthName) {
    const date = new Date(`01 ${monthName}`)
    date.setDate(0)

    const month = date.toLocaleString('en-US', {month: 'long'})
    const year = date.getFullYear().toString().substr(-2)

    return month + " " + year
}

export {GetMonthName, GetPreviousMonthName}

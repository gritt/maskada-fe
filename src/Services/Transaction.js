import {GetMonthName, GetPreviousMonthName} from "./Datetime"

// Debit is a transaction which is subtracted.
const DEBIT = 1
// Credit is a transaction which is subtracted the next month.
const CREDIT = 2
// Income is a transaction which is summed.
const INCOME = 3

/**
 * @return {object}
 */
function GroupBy(collatorFn, transactions) {
    if (!transactions) return {}
    return transactions.reduce((accumulator, transaction) => {
        const key = collatorFn(transaction)

        if (!accumulator[key]) {
            accumulator[key] = [transaction]
        } else {
            accumulator[key].push(transaction)
        }

        return accumulator
    }, {})
}

/**
 * @return {string}
 */
function ByMonthName(transaction) {
    return GetMonthName(transaction.date)
}

/**
 *
 * @param sorterFn function
 * @param transactions array
 * @returns array
 */
function SortBy(sorterFn, transactions) {
    if (!transactions) return []
    return transactions.sort(sorterFn)
}

/**
 *
 * @param a transaction
 * @param b transaction
 * @returns {number}
 */
function DescDateSorter(a, b) {
    return new Date(b.date) - new Date(a.date)
}

/**
 * @return {array}
 */
function GetTimeline(transactions) {
    const currentMonth = GetMonthName(Date.now())

    const timeline = Object.keys(transactions)
    if (!timeline.includes(currentMonth)) {
        timeline.push(currentMonth)
    }

    return timeline
}

/**
 * @return {number}
 */
function GetBalance(month, transactions) {
    let balance = 0
    let creditBalance = GetCreditBalance(GetPreviousMonthName(month), transactions)

    if (transactions[month] === undefined) {
        return balance - creditBalance
    }

    transactions[month].forEach(transaction => {
        switch (transaction.type) {
            case INCOME:
                balance += transaction.amount
                break
            case DEBIT:
                balance -= transaction.amount
                break
            default:
                break
        }
    })

    return balance - creditBalance
}

/**
 * @return {number}
 */
function GetCreditBalance(month, transactions) {
    let balance = 0
    if (transactions[month] !== undefined) {
        transactions[month].forEach(transaction => {
            if (transaction.type === CREDIT) {
                balance += transaction.amount
            }
        })
    }
    return balance
}

/**
 * @param type {CREDIT|DEBIT|INCOME}
 * @returns {string}
 */
function GetTypeName(type) {
    switch (type) {
        case DEBIT:
            return 'Debit'
        case CREDIT:
            return 'Credit'
        case INCOME:
            return 'Income'
        default:
            return 'Unknown'
    }
}

export {
    DEBIT,
    CREDIT,
    INCOME,

    GetBalance,
    GetTimeline,
    GetTypeName,

    GroupBy,
    ByMonthName,

    SortBy,
    DescDateSorter
}

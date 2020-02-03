import {GetMonthName} from "./Datetime";

// Debit is a transaction which is subtracted.
const DEBIT = 1;
// Credit is a transaction which is subtracted the next month.
const CREDIT = 2;
// Income is a transaction which is summed.
const INCOME = 3;

/**
 * @return {string}
 */
const ByMonthName = (transaction) => {
    return GetMonthName(transaction.date);
};

/**
 * @return {array}
 */
const GroupBy = (collatorFn, transactions) => {
    return transactions.reduce((accumulator, transaction) => {
        const key = collatorFn(transaction);

        if (!accumulator[key]) {
            accumulator[key] = [transaction];
        } else {
            accumulator[key].push(transaction);
        }

        return accumulator;
    }, {})
};

/**
 * @return {number}
 */
function GetBalance(month, transactions) {
    let balance = 0;
    if (transactions[month] === undefined) {
        return balance;
    }

    transactions[month].forEach(transaction => {
        balance += transaction.amount;
    });

    return balance;
}

/**
 * @return {array}
 */
function GetTimeline(transactions) {
    const currentMonth = GetMonthName(Date.now());

    const timeline = Object.keys(transactions);
    if (!timeline.includes(currentMonth)) {
        timeline.push(currentMonth);
    }

    return timeline;
}

export {GroupBy, ByMonthName, GetBalance, GetTimeline}

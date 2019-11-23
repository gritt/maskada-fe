import {GetMonthName} from "./Datetime";

const ByMonthName = (transaction) => {
    let date = new Date(transaction.date);
    return GetMonthName(date);
};

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

export {GroupBy, ByMonthName}
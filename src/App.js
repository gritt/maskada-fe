import React, {useState} from "react";
import './App.css';
import {Wallet} from "./Components/Wallet";
import {Transactions} from "./Scenes/Transactions";
import {GetMonthName} from "./Services/Datetime";

const testTransactions = [
    {
        "id": 1,
        "amount": 4050,
        "type": 3,
        "category": "Income",
        "date": "2019-09-02T03:26:26Z",
        "name": ""
    },
    {
        "id": 2,
        "amount": 37,
        "type": 2,
        "category": "Entertainment",
        "date": "2019-09-02T03:26:56Z",
        "name": ""
    },
    {
        "id": 3,
        "amount": 65,
        "type": 2,
        "category": "Entertainment",
        "date": "2019-09-02T03:26:56Z",
        "name": ""
    },
    {
        "id": 4,
        "amount": 32,
        "type": 1,
        "category": "Food",
        "date": "2019-09-02T03:26:56Z",
        "name": ""
    },
    {
        "id": 5,
        "amount": 21,
        "type": 2,
        "category": "Health",
        "date": "2019-09-02T03:26:56Z",
        "name": ""
    },
    {
        "id": 6,
        "amount": 13,
        "type": 2,
        "category": "Transport",
        "date": "2019-09-02T03:26:56Z",
        "name": ""
    },
    {
        "id": 7,
        "amount": 14,
        "type": 2,
        "category": "Transport",
        "date": "2019-09-02T03:26:56Z",
        "name": ""
    },
    {
        "id": 8,
        "amount": 110,
        "type": 2,
        "category": "Entertainment",
        "date": "2019-10-02T03:27:30Z",
        "name": "Weiss Pub"
    },
    {
        "id": 9,
        "amount": -320,
        "type": 1,
        "category": "Health",
        "date": "2019-10-03T03:27:30Z",
        "name": "Panvel"
    },
    {
        "id": 10,
        "amount": 80,
        "type": 2,
        "category": "Food",
        "date": "2019-11-02T03:27:57Z",
        "name": ""
    },
    {
        "id": 11,
        "amount": 32,
        "type": 2,
        "category": "Food",
        "date": "2019-12-02T03:28:05Z",
        "name": ""
    },
    {
        "id": 12,
        "amount": 68,
        "type": 1,
        "category": "Health",
        "date": "2019-12-02T03:28:41Z",
        "name": ""
    }
];

function App() {
    const byMonthName = (transaction) => {
        let date = new Date(transaction.date);
        return GetMonthName(date)
    };

    const groupBy = (collatorFn, transactions) => {
        return transactions.reduce((accumulator, transaction) => {
            const key = collatorFn(transaction);

            if (!accumulator[key]) {
                accumulator[key] = [transaction]
            } else {
                accumulator[key].push(transaction)
            }

            return accumulator
        }, {})
    };

    const [activeMonth, setMonth] = useState(
        GetMonthName(Date.now())
    );

    const [transactions] = useState(
        groupBy(byMonthName, testTransactions)
    );

    return (
        <div className="app">
            <Wallet transactions={transactions} activeMonth={activeMonth} setMonth={setMonth}/>
            <Transactions transactions={transactions} activeMonth={activeMonth}/>
        </div>
    );

}

export default App;

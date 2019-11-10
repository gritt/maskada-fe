import React from 'react';
import './App.css';
import {Wallet} from "./Components/Wallet";
import {Transactions} from "./Scenes/Transactions";

const transactions = [
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
        "amount": 110,
        "type": 2,
        "category": "Entertainment",
        "date": "2019-10-02T03:27:30Z",
        "name": "Weiss Pub"
    },
    {
        "id": 4,
        "amount": 80,
        "type": 2,
        "category": "Food",
        "date": "2019-11-02T03:27:57Z",
        "name": ""
    },
    {
        "id": 5,
        "amount": 32,
        "type": 2,
        "category": "Food",
        "date": "2019-11-02T03:28:05Z",
        "name": ""
    },
    {
        "id": 6,
        "amount": 68,
        "type": 1,
        "category": "Health",
        "date": "2019-12-02T03:28:41Z",
        "name": ""
    }
];

class App extends React.Component {
    byMonthName = (transaction) => {
        let date = new Date(transaction.date);

        let longMonth = date.toLocaleString('default', {month: 'long'});
        let shortenYear = date.getFullYear().toString().substr(-2);

        return longMonth + " " + shortenYear
    };

    groupBy = (collatorFn, transactions) => {
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

    constructor(props) {
        super(props);
        this.state = {
            transactions: this.groupBy(
                this.byMonthName,
                transactions,
            )
        };
    }

    render() {
        return (
            <div className="app">
                <Wallet transactions={this.state.transactions}/>
                <Transactions transactions={this.state.transactions}/>
            </div>
        );
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
}

export default App;

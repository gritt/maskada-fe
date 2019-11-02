import React from 'react';
import './App.css';
import {Header} from "./Components/Header";
import {Transaction} from "./Components/Transaction";

function App() {
    let testTransactions = [
        {
            "id": 1,
            "amount": 4050,
            "type": 3,
            "category": "Income",
            "date": "2019-11-02T03:26:26Z",
            "name": ""
        },
        {
            "id": 2,
            "amount": 37,
            "type": 2,
            "category": "Entertainment",
            "date": "2019-11-02T03:26:56Z",
            "name": ""
        },
        {
            "id": 3,
            "amount": 110,
            "type": 2,
            "category": "Entertainment",
            "date": "2019-11-02T03:27:30Z",
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
            "date": "2019-11-02T03:28:41Z",
            "name": ""
        }
    ];

    return (
        <div className="app">
            <Header/>
            <section className={"content"}>
                <ul>
                    {testTransactions.map(function (props) {
                        return (<Transaction {...props}/>);
                    })}
                </ul>
            </section>
        </div>
    );
}

export default App;

import React, {useState, useEffect} from "react";
import './App.css';
import {Wallet} from "./Components/Wallet";
import {Transactions} from "./Scenes/Transactions";
import {GetMonthName} from "./Services/Datetime";
import {Get} from "./Services/API";
import {ByMonthName, GroupBy} from "./Services/Transaction";

function App() {
    const [activeMonth, setMonth] = useState(
        GetMonthName(Date.now())
    );

    const [transactions, setTransactions] = useState(
        []
    );

    const transactionsHandler = (transactions, error) => {
        setTransactions(
            GroupBy(ByMonthName, transactions)
        );
    };

    useEffect(() => {
        Get('transaction', transactionsHandler)
    }, []);

    return (
        <div className="app">
            <Wallet transactions={transactions} activeMonth={activeMonth} setMonth={setMonth}/>
            <Transactions transactions={transactions} activeMonth={activeMonth}/>
        </div>
    );

}

export default App;

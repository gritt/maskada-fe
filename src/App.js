import React, {useEffect, useState} from "react"
import './App.css'

import {Get} from "./Services/API"
import {GetMonthName} from "./Services/Datetime"
import {ByMonthName, GroupBy} from "./Services/Transaction"

import {Wallet} from "./Components/Wallet"
import {PresentScene} from "./Scenes/Presenter";

function App() {
    // List of transactions
    const [transactions, setTransactions] = useState([])

    // Default visualization of transactions - by month
    const [month, setMonth] = useState(
        GetMonthName(Date.now())
    )

    // Get transaction from API and setTransactions grouped ByMonth
    function getTransactions() {
        Get('transaction',
            (transactions, error) => {
                setTransactions(
                    GroupBy(ByMonthName, transactions)
                )
            })
    }

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <div className="app">
            <Wallet
                transactions={transactions}
                activeMonth={month}
                setMonth={setMonth}
            />
            <PresentScene
                transactions={transactions}
                collation={month}
                refresh={getTransactions}
            />
        </div>
    )
}

export default App

import React, {useEffect, useState} from "react"
import './App.css'
import {Wallet} from "./Components/Wallet"
import {ListTransactions} from "./Scenes/ListTransactions"
import {GetMonthName} from "./Services/Datetime"
import {Get} from "./Services/API"
import {ByMonthName, GroupBy} from "./Services/Transaction"
import {AddTransaction} from "./Scenes/AddTransaction";

function App() {
    const [activeMonth, setActiveMonth] = useState(GetMonthName(Date.now()))
    const [transactions, setTransactions] = useState([])

    const callback = (transactions, error) => {
        setTransactions(GroupBy(ByMonthName, transactions))
    }

    useEffect(() => {
        Get('transaction', callback)
    }, [])

    return (
        <div className="app">
            <Wallet transactions={transactions} activeMonth={activeMonth} setActiveMonth={setActiveMonth}/>
            <AddTransaction/>
            <ListTransactions transactions={transactions} collation={activeMonth}/>
        </div>
    )

}

export default App

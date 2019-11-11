import React, {useEffect} from "react";
import {GetMonthName} from "../Services/Datetime";

function Wallet({transactions, activeMonth, setMonth}) {
    return (
        <header className="sticky">
            <Timeline transactions={transactions} activeMonth={activeMonth} setMonth={setMonth}/>
            <Balance transactions={transactions} activeMonth={activeMonth}/>
        </header>
    );
}

function Timeline({transactions, activeMonth, setMonth}) {
    const timeline = getTimeline(transactions);

    useEffect(() => {
        document.title = activeMonth;
    });

    return (
        <nav className="months-nav">
            <ul className="months-nav__list">
                {timeline.map((month) => {
                    let style = month === activeMonth ? 'months-nav__list--active' : undefined;
                    return (
                        <li className={style} key={month} onClick={() => {setMonth(month)}}>
                            {month}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

function getTimeline(transactions) {
    const timeline = Object.keys(transactions);
    const month = GetMonthName(Date.now());

    if (!timeline.includes(month)) {
        timeline.push(month);
    }

    return timeline
}

function Balance({activeMonth, transactions}) {
    const balance = getBalance(transactions, activeMonth);
    const status = balance >= 0 ? "account account--positive" : "account account--negative";

    return (
        <h1 className={status}>$ {balance}</h1>
    );
}

function getBalance(transactions, activeMonth) {
    let balance = 0;
    if (transactions[activeMonth] === undefined) {
        return balance;
    }

    const monthlyTransactions = transactions[activeMonth];
    monthlyTransactions.forEach(transaction => {
        balance += transaction.amount
    });

    return balance
}

export {Wallet}
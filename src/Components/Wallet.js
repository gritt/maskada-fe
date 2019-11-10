import React from "react";
import {GetMonthName, IsCurrent} from "../Services/Datetime";

function Wallet(props) {
    return (
        <header className="sticky">
            <Timeline transactions={props.transactions}/>
            <Balance transactions={props.transactions}/>
        </header>
    );
}

function Timeline(props) {
    const timeline = buildTimeline(props.transactions);

    return (
        <nav className="months-nav">
            <ul className="months-nav__list">
                {timeline.map((month) => {
                    return (
                        <Month month={month} key={month}/>
                    );
                })}
            </ul>
        </nav>
    );
}

function Month(props) {
    let isActive = IsCurrent(props.month) ? 'months-nav__list--active' : undefined;

    return (
        <li className={isActive} key={props.month}>
            {props.month}
        </li>
    );
}

function Balance(props) {
    const balance = calculateBalance(props.transactions);
    const status = balance >= 0 ? "account account--positive" : "account account--negative";

    return (
        <h1 className={status}>$ {balance}</h1>
    );
}

function buildTimeline(transactions) {
    const timeline = Object.keys(transactions);

    const month = GetMonthName(Date.now());
    if (!timeline.includes(month)) {
        timeline.push(month);
    }

    return timeline
}

function calculateBalance(transactions) {
    const month = GetMonthName(Date.now());
    const monthlyTransactions = transactions[month];

    let balance = 0;
    monthlyTransactions.forEach(transaction => {
        balance += transaction.amount
    });

    return balance
}

export {Wallet}
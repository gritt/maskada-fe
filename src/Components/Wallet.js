import React, {useEffect} from "react";
import {GetBalance, GetTimeline} from "../Services/Transaction";

function Wallet({transactions, activeMonth, setActiveMonth}) {
    useEffect(() => {
        document.title = activeMonth;
    });

    const timeline = GetTimeline(transactions);

    const balance = GetBalance(activeMonth, transactions);
    const balanceStyle = balance >= 0 ? "account account--positive" : "account account--negative";

    function Month(month) {
        const monthStyle = month === activeMonth ? 'months-nav__list--active' : undefined;
        return (
            <li className={monthStyle} key={month} onClick={() => {setActiveMonth(month)}}>
                {month}
            </li>
        );
    }

    return (
        <header className="sticky">
            <nav className="months-nav">
                <ul className="months-nav__list">
                    {timeline.map(month => {
                        return Month(month)
                    })}
                </ul>
            </nav>
            <h1 className={balanceStyle}>$ {balance}</h1>
        </header>
    );
}

export {Wallet}
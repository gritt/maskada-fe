import React from "react";

function Header(props) {
    const timeline = getTimeline(props.transactions);
    const wallet = getSummary(props.transactions);

    return (
        <header className="sticky">
            <nav className="months-nav">
                <ul className="months-nav__list">
                    {timeline.map(function (month) {
                        return (
                            <li className={isCurrent(month) ? 'months-nav__list--active' : undefined} key={month}>
                                {month}
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <h1 className="account">$ {wallet}</h1>
        </header>
    );
}

function getTimeline(transactions) {
    let timeline = Object.keys(transactions);

    let month = getMonth(Date.now());
    if (!timeline.includes(month)) {
        timeline.push(month);
    }

    return timeline
}

function isCurrent(month) {
    let current = getMonth(Date.now());

    return current === month
}

function getMonth(datetime) {
    let date = new Date(datetime);

    let longMonth = date.toLocaleString('default', {month: 'long'});
    let shortenYear = date.getFullYear().toString().substr(-2);

    return longMonth + " " + shortenYear
}

function getSummary(transactions) {
    let month = getMonth(Date.now());

    const monthlyTransactions = transactions[month];

    let balance = 0;
    monthlyTransactions.forEach(transaction => {
        balance += transaction.amount
    });

    return balance
}

export {Header}
import React from "react";

function Header(props) {
    let currentMonth = getMonthName(Date.now());

    function selectedIfCurrent(month) {
        return currentMonth === month ? 'months-nav__list--active' : undefined
    }

    let timeline = getTimeline(props.transactions);

    if (!timeline.includes(currentMonth)) {
        timeline.push(currentMonth)
    }

    return (
        <div className="sticky">
            <header>
                <nav className="months-nav">
                    <ul className="months-nav__list">
                        {timeline.map(function (month) {
                            return (
                                <li className={selectedIfCurrent(month)} key={month}>
                                    {month}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <h1 className="account">$ 5.764</h1>
            </header>
        </div>
    );
}

function getTimeline(transactions) {
    let timeline = [];

    function toMonthsTimeline(transaction) {
        let month = getMonthName(transaction.date);
        if (!timeline.includes(month)) {
            timeline.push(month)
        }
    }

    transactions.filter(toMonthsTimeline);

    return timeline
}

function getMonthName(datetime) {
    let date = new Date(datetime);

    let longMonth = date.toLocaleString('default', {month: 'long'});
    let shortenYear = date.getFullYear().toString().substr(-2);
    return longMonth + " " + shortenYear
}

export {Header}
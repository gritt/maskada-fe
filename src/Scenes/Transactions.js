import React from 'react'
import {Transaction} from "../Components/Transaction";
import {GetMonthName} from "../Services/Datetime";

function Transactions(props) {
    const month = GetMonthName(Date.now());
    const monthlyTransactions = props.transactions[month];

    return (
        <section className="content">
            <ul>
                {monthlyTransactions.map((transaction) => {
                    return (<Transaction {...transaction} key={transaction.id}/>);
                })}
            </ul>
        </section>
    );
}

export {Transactions}
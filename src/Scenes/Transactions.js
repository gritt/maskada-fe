import React from 'react'
import {Transaction} from "../Components/Transaction";

function Transactions({transactions, activeMonth}) {
    function TransactionsList() {
        return (
            <ul>
                {transactions[activeMonth].map((transaction) => {
                    return (<Transaction {...transaction} key={transaction.id}/>);
                })}
            </ul>
        );
    }

    function NoTransactions() {
        return (
            <i className="content__no-transactions">"if I don't buy anything, discount is bigger..."</i>
        );
    }

    return (
        <section className="content">
            {transactions[activeMonth] === undefined ? <NoTransactions/> : <TransactionsList/>}
        </section>
    );
}

export {Transactions}
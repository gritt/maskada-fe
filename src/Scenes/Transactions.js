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

    return (
        <section className="content">
            <TransactionsList/>
        </section>
    );
}

export {Transactions}
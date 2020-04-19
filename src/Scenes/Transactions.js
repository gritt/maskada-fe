import React from 'react'
import {Transaction} from "../Components/Transaction"

function Transactions({transactions, activeMonth}) {
    function TransactionsList() {
        return (
            <ul>
                {transactions[activeMonth].map((transaction) => {
                    return (<Transaction {...transaction} key={transaction.id}/>)
                })}
            </ul>
        )
    }

    function NoTransactions() {
        return (
            <i className="content__no-transactions">"if I don't buy anything, discount is bigger..."</i>
        )
    }

    let monthHasTransactions = transactions[activeMonth] === undefined

    return (
        <section className="content">
            {
                monthHasTransactions
                    ? <NoTransactions/>
                    : <TransactionsList/>
            }
        </section>
    )
}

export {Transactions}

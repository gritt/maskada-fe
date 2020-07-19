import React from 'react'
import {View} from "../Components/TransactionView"
import "./ListTransactions.css"

function ListTransactions({transactions, collation}) {
    function TransactionsList() {
        return (
            <ul>
                {transactions[collation].map((transaction) => {
                    return (<View {...transaction} key={transaction.id}/>)
                })}
            </ul>
        )
    }

    function NoTransactions() {
        return (
            <i className="content__no-transactions">"if I don't buy anything, discount is bigger..."</i>
        )
    }

    let hasTransactions = !!transactions[collation]

    return (
        <section className="content">
            {
                hasTransactions
                    ? <TransactionsList/>
                    : <NoTransactions/>
            }
        </section>
    )
}

export {ListTransactions}

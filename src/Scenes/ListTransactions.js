import React from 'react'
import {View} from "../Components/TransactionView"
import "./ListTransactions.css"
import {DescDateSorter, SortBy} from "../Services/Transaction";

function ListTransactions({transactions, collation}) {
    function TransactionsList() {
        let sortedTransactions = SortBy(DescDateSorter, transactions[collation])

        return (
            <ul>
                {sortedTransactions.map((transaction) => {
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

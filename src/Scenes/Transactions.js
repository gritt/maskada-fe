import React from 'react'
import {Transaction} from "../Components/Transaction";

function Transactions(props) {
    return (
        <section className="content">
            <ul>
                {props.transactions.map(function (transaction) {
                    return (<Transaction {...transaction} key={transaction.id}/>);
                })}
            </ul>
        </section>
    );
}

export {Transactions}
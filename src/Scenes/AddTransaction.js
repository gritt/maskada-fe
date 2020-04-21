import React from 'react'
import {Form} from "../Components/TransactionForm";

function AddTransaction() {
    const createTransaction = (transaction, successCallback) => {
        // {
        //     "id": 10,
        //     "amount": 4050,
        //     "type": 3,
        //     "category": "Thoughtworks",
        //     "date": "2020-03-18T23:52:02Z",
        //     "name": ""
        // }

        // create transaction with API.js

        // successCallback()
    }

    return (
        <section className="content">
            <Form onSubmit={createTransaction}/>
        </section>
    )
}

export {AddTransaction}

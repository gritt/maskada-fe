import React, {useState} from 'react'
import {Post} from "../Services/API";
import {FormBuilder} from "../Components/Form/FormBuilder";
import useTransaction from "../Components/Form/UseTransaction";

function AddTransaction({doneCallback}) {
    const transaction = useTransaction()
    const [stage, setStage] = useState('form')

    function create(transaction) {
        try {
            setStage('loading')

            function callback(response, error) {
                return !error
                    ? setStage('success')
                    : setStage('error')
            }

            transaction.validate()

            Post('transaction', callback, transaction.serialize())

        } catch (e) {
            setStage('error')
        }
    }

    function viewStage() {
        let props = {
            submit: create,
            transaction: transaction
        }
        switch (stage) {
            case "form":
                return <FormBuilder {...props}/>
            case "loading":
                return <FormBuilder {...props} loading={true}/>
            case "error":
                return <FormBuilder {...props} errors={true}/>
            case 'success':
                return doneCallback()
            default:
                return <FormBuilder {...props}/>
        }
    }

    return (
        <div className="sticky-cover">
            <section className="content">
                {viewStage()}
            </section>
        </div>
    )
}

export {AddTransaction}

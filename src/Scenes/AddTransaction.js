import React, {useState} from 'react'
import {Post} from "../Services/API";
import {FormBuilder} from "../Components/Form/FormBuilder";
import {Loading, Success} from "../Components/Form/Animations";
import {Transaction} from "../Components/Form/Transaction";

function AddTransaction() {
    const transaction = Transaction()
    const [stage, setStage] = useState('form')

    function create(transaction) {
        try {
            setStage('loading')

            const callback = (response, error) => {
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
        switch (stage) {
            case "form":
                return <FormBuilder
                    submit={create}
                    transaction={transaction}
                />

            case "error":
                return <FormBuilder
                    submit={create}
                    transaction={transaction}
                    errors={true}/>

            case "loading":
                return <Loading/>

            case 'success': {
                setTimeout(() => {
                    setStage('form')
                }, 2000)

                return <Success/>
            }

            default : {
                return <FormBuilder submit={create}/>
            }
        }
    }

    return (
        <section className="content">
            {viewStage()}
        </section>
    )
}

export {AddTransaction}

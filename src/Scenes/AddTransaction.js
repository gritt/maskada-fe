import React, {useState} from 'react'
import {Post} from "../Services/API";
import {FormBuilder} from "../Components/Form/FormBuilder";
import {Loading, Success} from "../Components/Form/Animations";

function AddTransaction() {
    // `form` > `loading` > `success` || `error`
    const [stage, setStage] = useState('form')

    function create(transaction) {
        try {
            console.log('loading...')
            setStage('loading')

            const callback = (response, error) => {
                return !error
                    ? setStage('success')
                    : setStage('error')
            }

            transaction.validate()

            Post('transaction', callback, transaction.serialize())

        } catch (e) {
            console.log('create::', e)
            setStage('error')
        }
    }

    function viewStage() {
        switch (stage) {
            case "form":
                return <FormBuilder submitHandler={create}/>
            case "error":
                return <FormBuilder submitHandler={create} withError={true}/>
            case "loading":
                return <Loading/>
            case 'success': {
                return <Success/>
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

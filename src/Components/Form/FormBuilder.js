import React from "react";
import {CategoryInput} from "./CategoryInput";
import {TypeInput} from "./TypeInput";
import {AmountInput} from "./AmountInput";

import "../Base.css"
import "./FormBuilder.css"

const FormBuilder = ({transaction, submit, errors}) => {
    let style = !errors
        ? `add-transaction ${transaction.decoration()}`
        : `add-transaction ${transaction.decoration()} add-transaction__error`

    const onClick = () => {
        submit(transaction)
    }

    const onClear = () => {
        transaction.reset()
    }

    return (
        <div>
            <div className={style}>
                <div className={"add-transaction__description"}>
                    <TypeInput transaction={transaction}/>
                    <CategoryInput transaction={transaction}/>
                </div>
                <div className={"add-transaction__amount"}>
                    <AmountInput transaction={transaction}/>
                </div>
            </div>
            <div className={"add-transaction__controls"}>
                <a className={"add-transaction__controls--cancel"} onClick={onClear}>✕</a>
                <a className={"add-transaction__controls--save"} onClick={onClick}>✓</a>
            </div>
        </div>
    )
}

export {FormBuilder}

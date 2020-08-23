import React from "react";
import {CategoryInput} from "./CategoryInput";
import {TypeInput} from "./TypeInput";
import {AmountInput} from "./AmountInput";

import "../Base.css"
import "./FormBuilder.css"

const FormBuilder = ({transaction, submit, errors}) => {
    let style = !errors
        ? `add-transaction`
        : `add-transaction add-transaction__error`

    const onClick = () => {
        submit(transaction)
    }

    const onClear = () => {
        transaction.reset()
    }

    return (
        <div>
            <div className={style}>
                <div className={"add-transaction__right"}>
                    <CategoryInput transaction={transaction}/>
                </div>
                <div className={"add-transaction__left"}>
                    <TypeInput transaction={transaction}/>
                    <AmountInput transaction={transaction}/>
                </div>
            </div>

            <div className={"add-transaction__bottom"}>
                <span onClick={onClick}>✓</span>
                <span onClick={onClear}>✕</span>
            </div>
        </div>
    )
}

export {FormBuilder}

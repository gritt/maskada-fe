import React, {useState} from "react";
import {CREDIT, DEBIT, GetTypeName, INCOME,} from "../../Services/Transaction";
import {Categories, CategoryInput} from "./CategoryInput";
import {TypeInput} from "./TypeInput";
import {AmountInput} from "./AmountInput";

import "../Base.css"
import "./FormBuilder.css"

// Template Function
function Transaction() {
    const [type, setType] = useState(CREDIT)
    const [category, setCategory] = useState(undefined)
    const [amount, setAmount] = useState(0)

    const serialize = () => {
        return {
            type: type,
            category: category,
            amount: amount
        }
    }

    const reset = () => {
        setType(CREDIT)
        setCategory(undefined)
        setAmount(0)
    }

    const validate = () => {
        if (amount <= 0) {
            throw new Error('invalid amount')
        }
        if ([CREDIT, DEBIT, INCOME].indexOf(type) === -1) {
            throw new Error('invalid type')
        }
        if (Categories.indexOf(category) === -1) {
            throw new Error('invalid category')
        }
    }

    const decoration = () => {
        return `transaction__type-${GetTypeName(type).toLocaleLowerCase()}`
    }

    return {
        serialize,
        reset,
        validate,
        decoration,
        type,
        setType,
        category,
        setCategory,
        amount,
        setAmount,
    }
}

// Form Builder for Transaction
const FormBuilder = ({submitHandler, withError}) => {
    let transaction = Transaction()

    let style = `add-transaction ${transaction.decoration()}`
    if (withError) {
        style += ' add-transaction__error'
    }

    const onClick = () => {
        submitHandler(transaction)
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

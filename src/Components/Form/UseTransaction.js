import {useState} from "react";
import {CREDIT, DEBIT, GetTypeName, INCOME} from "../../Services/Transaction";
import {Categories} from "./CategoryInput";

/**
 * abstracts transaction state handling
 */
function useTransaction() {
    const [type, setType] = useState(CREDIT)
    const [category, setCategory] = useState(undefined)
    const [amount, setAmount] = useState(0)

    function serialize() {
        return {
            type: type,
            category: category,
            amount: amount
        }
    }

    function reset() {
        setType(CREDIT)
        setCategory(undefined)
        setAmount(0)
    }

    function validate() {
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

    function decoration() {
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

export default useTransaction

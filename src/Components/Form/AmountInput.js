import React from "react";
import "./AmountInput.css"

function AmountInput({transaction}) {
    let style = `amount-input ${transaction.decoration()}`

    const onChange = (e) => {
        let value = e.target.value >= 1
            ? Number(e.target.value)
            : 0
        transaction.setAmount(value)
    }

    return (
        <span>
            <input type={"number"} value={transaction.amount} className={style} onChange={onChange}/>
        </span>
    )
}

export {AmountInput}

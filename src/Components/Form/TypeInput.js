import React from "react";
import {GetTypeName} from "../../Services/Transaction";
import "./TypeInput.css"

function TypeInput({transaction}) {
    const onClick = () => {
        return (transaction.type < 3)
            ? transaction.setType(transaction.type + 1)
            : transaction.setType(1)
    }

    return (
        <button className={'type-input'} onClick={onClick}>
            {GetTypeName(transaction.type)}
        </button>
    )
}

export {TypeInput}

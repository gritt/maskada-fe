import React from "react";
import {CREDIT, DEBIT, INCOME} from "../Services/Transaction";
import "./Base.css"
import "./TransactionView.css"

function View({type, category, name, date, amount}) {
    let style = `transaction__amount  ${getStyle(type)}`

    name = !name ? category : name

    return (
        <li className={"transaction"}>
            <span className="transaction__description">
                <span className="transaction__name">{name}</span>
                <span className="transaction__date">{date}</span>
            </span>
            <span>
                <span className={style}>$ {amount}</span>
                <span className="transaction__connection"/>
            </span>
        </li>
    )
}

function getStyle(type) {
    switch (type) {
        case DEBIT :
            return "transaction__type-debit"
        case CREDIT:
            return "transaction__type-credit"
        case INCOME:
            return "transaction__type-income"
        default:
            return "transaction__type-unknown"
    }
}

export {View}

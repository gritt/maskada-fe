import {CREDIT, DEBIT, INCOME} from "../Services/Transaction";
import React from "react";
import "./Base.css"
import "./TransactionView.css"

function View(props) {
    let style = "transaction__amount " + getStyle(props.type)

    let name = props.name === ""
        ? props.category
        : props.name

    return (
        <li className={"transaction"}>
            <span className="transaction__description">
                <span className="transaction__name">{name}</span>
                <span className="transaction__date">{props.date}</span>
            </span>
            <span>
                <span className={style}>$ {props.amount}</span>
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

import React from "react";

function Transaction(props) {
    let style = getStyle(props.type);

    return (
        <li className={"transaction"}>
            <span className="transaction__description">
                <span className="transaction__name">
                {props.name === "" ? props.category : props.name}
                </span>
                <span className="transaction__date">
                {props.id} - {props.date}
                </span>
            </span>
            <span>
                <span className={style}>{props.amount}</span>
                <span className="transaction__connection"/>
            </span>
        </li>
    );
}

function getStyle(type) {
    switch (type) {
        case 1 :
            return "transaction__amount transaction__type-debit";
        case 2:
            return "transaction__amount transaction__type-credit";
        case 3:
            return "transaction__amount transaction__type-income";
        default:
            return "transaction__amount transaction__type-undefined";
    }
}

export {Transaction}
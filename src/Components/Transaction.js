import React from "react";

// Debit is a transaction which is subtracted.
const DEBIT = 1;
// Credit is a transaction which is subtracted the next month.
const CREDIT = 2;
// Income is a transaction which is summed.
const INCOME = 3;

function Transaction(props) {
    return (
        <li className={"transaction"}>
            <Info date={props.date} name={props.name} category={props.category}/>
            <Amount amount={props.amount} type={props.type}/>
        </li>
    );
}

function Amount(props) {
    let style = "transaction__amount " + getStyle(props.type);
    return (
        <span>
            <span className={style}>$ {props.amount}</span>
            <span className="transaction__connection"/>
        </span>
    );
}

function Info(props) {
    let name = props.name === "" ? props.category : props.name;

    return (
        <span className="transaction__description">
            <span className="transaction__name">{name}</span>
            <span className="transaction__date">{props.date}</span>
        </span>
    );
}

function getStyle(type) {
    switch (type) {
        case DEBIT :
            return "transaction__type-debit";
        case CREDIT:
            return "transaction__type-credit";
        case INCOME:
            return "transaction__type-income";
        default:
            return "transaction__type-undefined";
    }
}

export {Transaction}
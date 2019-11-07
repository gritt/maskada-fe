import React from "react";

function Transaction(props) {
    let name = props.name === "" ?
        props.category :
        props.name;

    return (
        <li className={"transaction"}>
            <span className="transaction__description">
                <span className="transaction__name">{name}</span>
                <span className="transaction__date">{props.date}</span>
            </span>
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

function getStyle(type) {
    switch (type) {
        case 1 :
            return "transaction__type-debit";
        case 2:
            return "transaction__type-credit";
        case 3:
            return "transaction__type-income";
        default:
            return "transaction__type-undefined";
    }
}

export {Transaction}
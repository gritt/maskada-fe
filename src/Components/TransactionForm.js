import React, {useState} from "react";
import {CREDIT, GetTypeName} from "../Services/Transaction";
import "./Transaction.css"
import "./TransactionForm.css"

function Form(props) {
    const [typeId, setTypeId] = useState(CREDIT)

    const cycleType = () => {
        return (typeId < 3) ? setTypeId(typeId + 1) : setTypeId(1)
    }

    let type = GetTypeName(typeId)
    let style = "transaction__type-" + type.toLocaleLowerCase()
    let formStyle = "add-transaction " + style

    return (
        <div>
            <div className={formStyle}>
                <div className={"add-transaction__description"}>
                    <TypeInput style={style} type={type} cycleType={cycleType}/>
                    <CategoryInput style={style}/>
                </div>
                <div className={"add-transaction__amount"}>
                    <AmountInput style={style}/>
                </div>
            </div>
            <div className={"add-transaction__controls"}>
                <a className={"add-transaction__controls--cancel"} href="#">✕</a>
                <a className={"add-transaction__controls--save"} href="#">✓</a>
            </div>
        </div>
    )
}

function TypeInput(props) {
    let style = "type-input " + props.style

    return (
        <button className={style} onClick={props.cycleType}>
            {props.type}
        </button>
    )
}

function CategoryInput(props) {
    let style = "category-input " + props.style

    let isActive = "category-input--active"

    return (
        <span className={style}>
            <ul>
                <li>Food</li>
                <li>Health</li>
                <li className={isActive}>Transport</li>
                <li>Pet</li>
                <li>Category A</li>
                <li>Category B</li>
                <li>Category C</li>
                <li>Category D</li>
                <li>Category E</li>
            </ul>
        </span>
    )
}

function AmountInput(props) {
    let style = "amount-input " + props.style

    return (
        <span>
            <input className={style} type={"number"} value={props.amount}/>
        </span>
    )
}

export {Form}

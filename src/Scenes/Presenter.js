import React, {useState} from "react";

import "./Controls.css"
import {AddIcon, CancelIcon} from "../Assets/Icons";

import {ListTransactions} from "./ListTransactions";
import {AddTransaction} from "./AddTransaction";

function PresentScene({transactions, collation, refresh}) {
    const [scene, setScene] = useState("list")

    function callback() {
        setScene("list")
        refresh()
    }

    function viewScene() {
        switch (scene) {
            case "add":
                return <AddTransaction doneCallback={callback}/>
            default:
                return <ListTransactions transactions={transactions} collation={collation}/>
        }
    }

    return (
        <div>
            {viewScene()}
            <ControlScene scene={scene} setScene={setScene}/>
        </div>
    )
}

function ControlScene({scene, setScene}) {
    const [icon, setIcon] = useState(AddIcon())

    function onClick() {
        if (scene === "list") {
            setScene("add")
            setIcon(CancelIcon())
        } else {
            setScene("list")
            setIcon(AddIcon())
        }
    }

    return (
        <div className={"sticky-bottom"}>
            <div className={'controls'}>
                <span className={"control__button control__button--new"} onClick={onClick}>
                    {icon}
                </span>
            </div>
        </div>
    )
}

export {PresentScene}

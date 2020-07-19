import React, {useEffect} from "react"
import {GetBalance, GetTimeline} from "../Services/Transaction"
import "./Wallet.css"

function Wallet({transactions, activeMonth, setActiveMonth}) {
    useEffect(() => {
        document.title = activeMonth
    })

    function Month(month) {
        let style = month === activeMonth
            ? 'months-nav__list--active'
            : undefined

        const onClick = () => {
            setActiveMonth(month)
        }

        return (
            <li className={style} key={month} onClick={onClick}>
                {month}
            </li>
        )
    }

    const timeline = GetTimeline(transactions)
    const balance = GetBalance(activeMonth, transactions)

    let style = balance >= 0
        ? "account account--positive"
        : "account account--negative"

    return (
        <header className="sticky">
            <nav className="months-nav">
                <ul className="months-nav__list">
                    {timeline.map(month => {
                        return Month(month)
                    })}
                </ul>
            </nav>
            <h1 className={style}>$ {balance}</h1>
        </header>
    )
}

export {Wallet}

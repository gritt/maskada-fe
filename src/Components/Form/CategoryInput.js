import React from "react";
import "./CategoryInput.css"

// Initial set of categories which transactions can belong to.
const Categories = [
    "Food",
    "Transport",
    "Travel",
    "Entertainment",
    "Subscriptions",
    "Pet",
    "Health",
    "Home",
    "Salary",
    "Clothes",
    "Gadgets",
    "Other"
]

function CategoryInput({transaction}) {
    const option = (name) => {
        let style = transaction.category === name
            ? "category-input--active"
            : ""

        const onClick = () => {
            transaction.setCategory(name)
        }

        return (
            <li key={name} className={style} onClick={onClick}>
                {name}
            </li>
        )
    }

    return (
        <span className={'category-input'}>
            <ul>
                {Categories.map(name => {
                    return option(name)
                })}
            </ul>
        </span>
    )
}

export {Categories, CategoryInput}

import React from "react";
import "./Animations.css"

const Animation = (className) => {
    let style = `animation ${className}`

    return (
        <div className={style}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )

}

const Loading = () => {
    return (
        <div className={"animation-place"}>
            {Animation('loading')}
        </div>
    )
}

const Success = () => {
    return (
        <div className={"animation-place"}>
            {Animation('success')}
        </div>
    )
}

export {Loading, Success}

import React from "react";
import "./Animations.css"

const Loading = () => {
    return (
        <div className={"animation-place"}>
            <div className={"loading"}/>
        </div>
    )
}

const Success = () => {
    return (
        <div className={"animation-place"}>
            <div className='success'>
                ✓︎
            </div>
        </div>
    )
}

export {Loading, Success}

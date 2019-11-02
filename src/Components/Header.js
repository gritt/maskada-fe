import React from "react";

function Header() {
    return (
        <div className="sticky">
            <header>
                <nav className="months-nav">
                    <ul className="months-nav__list">
                        <li>January</li>
                        <li>February</li>
                        <li>March</li>
                        <li>April</li>
                        <li>May</li>
                        <li>June</li>
                        <li>July</li>
                        <li className="months-nav__list--active">August</li>
                        <li>September</li>
                        <li>October</li>
                        <li>November</li>
                        <li>December</li>
                    </ul>
                </nav>
                <h1 className="account">$ 5.764</h1>
            </header>
        </div>
    );
}

export {Header}
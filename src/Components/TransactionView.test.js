import React from "react";
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {View} from "./TransactionView";
import {CREDIT, DEBIT, INCOME} from "../Services/Transaction";

describe('TransactionView', () => {
    // given
    let givenTransaction;

    beforeEach(() => {
        givenTransaction = {
            category: "Food",
            date: "20/04/2020",
            amount: "100"
        }
    })

    it('renders with props', () => {
        // when
        render(<View {...givenTransaction}/>)

        // then
        expect(screen.getByText(givenTransaction.category)).toBeTruthy()
        expect(screen.getByText(givenTransaction.date)).toBeTruthy()

        expect(screen.getByText(`$ ${givenTransaction.amount}`)).toBeTruthy()
    });
    it('should render transaction name instead of category when is given', () => {
        // given
        givenTransaction.name = "Galaxy Buds"

        // when
        render(<View {...givenTransaction}/>)

        // then
        expect(screen.getByText(givenTransaction.name)).toBeTruthy()
    });
    it('should render with credit style', () => {
        // given
        givenTransaction.type = CREDIT

        // when
        render(<View {...givenTransaction}/>)

        // then
        expect(screen.getByText(`$ ${givenTransaction.amount}`)).toHaveClass('transaction__type-credit')
    });
    it('should render with debit style', () => {
        // given
        givenTransaction.type = DEBIT

        // when
        render(<View {...givenTransaction}/>)

        // then
        expect(screen.getByText(`$ ${givenTransaction.amount}`)).toHaveClass('transaction__type-debit')
    });
    it('should render with income style', () => {
        // given
        givenTransaction.type = INCOME

        // when
        render(<View {...givenTransaction}/>)

        // then
        expect(screen.getByText(`$ ${givenTransaction.amount}`)).toHaveClass('transaction__type-income')
    });
})

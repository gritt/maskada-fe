import React from "react";
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {TypeInput} from "./TypeInput";
import {CREDIT, DEBIT, GetTypeName, INCOME} from "../../Services/Transaction";

describe('TypeInput', () => {
    // given
    let givenTransaction = {
        decoration: jest.fn(),
        type: DEBIT,
        setType: jest.fn()
    }

    it('renders with props', () => {
        // when
        render(<TypeInput transaction={givenTransaction}/>)

        // then
        expect(givenTransaction.decoration).toBeCalled()
        expect(screen.getByRole('button')).toHaveTextContent(GetTypeName(givenTransaction.type))
    });
    it('should update type from DEBIT to CREDIT when clicked', () => {
        // given
        render(<TypeInput transaction={givenTransaction}/>)

        // when
        fireEvent.click(screen.getByRole('button'))

        // then
        expect(givenTransaction.setType).toBeCalledWith(CREDIT)
    });
    it('should update type from CREDIT to INCOME when clicked', () => {
        // given
        givenTransaction.type = CREDIT

        render(<TypeInput transaction={givenTransaction}/>)

        // when
        fireEvent.click(screen.getByRole('button'))

        // then
        expect(givenTransaction.setType).toBeCalledWith(INCOME)
    });
    it('should update type from INCOME to DEBIT when clicked', () => {
        // given
        givenTransaction.type = INCOME

        render(<TypeInput transaction={givenTransaction}/>)

        // when
        fireEvent.click(screen.getByRole('button'))

        // then
        expect(givenTransaction.setType).toBeCalledWith(DEBIT)
    });
})

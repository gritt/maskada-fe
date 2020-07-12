import React from "react";
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {AmountInput} from "./AmountInput";

describe('AmountInput', () => {
    // given
    let givenTransaction = {
        decoration: jest.fn(),
        amount: 10,
        setAmount: jest.fn(),
    }

    it('renders with props', () => {
        // when
        render(<AmountInput transaction={givenTransaction}/>)

        // then
        expect(givenTransaction.decoration).toBeCalled()
        expect(screen.getByRole('spinbutton')).toHaveClass('amount-input')
        expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number')
        expect(screen.getByRole('spinbutton')).toHaveAttribute('value', `${givenTransaction.amount}`)
    });
    it('should update the amount when value changes', () => {
        // given
        render(<AmountInput transaction={givenTransaction}/>)

        // when
        fireEvent.change(screen.getByRole('spinbutton'), {target: {value: 20}})

        // then
        expect(givenTransaction.setAmount).toBeCalledWith(20)
    });
    it('should update the amount with zero when negative value is given', () => {
        // given
        render(<AmountInput transaction={givenTransaction}/>)

        // when
        fireEvent.change(screen.getByRole('spinbutton'), {target: {value: -5}})

        // then
        expect(givenTransaction.setAmount).toBeCalledWith(0)
    });
});

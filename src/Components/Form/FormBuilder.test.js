import React from "react";
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import {FormBuilder} from "./FormBuilder";

import {TypeInput} from "./TypeInput";
import {CategoryInput} from "./CategoryInput";
import {AmountInput} from "./AmountInput";
import {CREDIT} from "../../Services/Transaction";
import useTransaction from "./UseTransaction";

jest.mock("./UseTransaction")
jest.mock("./TypeInput")
jest.mock("./CategoryInput")
jest.mock("./AmountInput")

describe('FormBuilder', () => {
    // given
    beforeEach(() => {
        useTransaction.mockImplementationOnce(() => {
            return {
                reset: jest.fn(),
                decoration: jest.fn(),
                type: CREDIT,
                category: "Test",
                amount: 200,
            }
        })
        TypeInput.mockImplementationOnce(({transaction}) => {
            return <div data-testid={'test-type'}>{transaction.type}</div>
        })
        CategoryInput.mockImplementationOnce(({transaction}) => {
            return <div data-testid={'test-category'}>{transaction.category}</div>
        })
        AmountInput.mockImplementationOnce(({transaction}) => {
            return <div data-testid={'test-amount'}>{transaction.amount}</div>
        })
    })

    it('renders input fields with props', () => {
        // given
        const mockTransaction = useTransaction()

        // when
        render(<FormBuilder
            transaction={mockTransaction}
            submit={jest.fn()}
            errors={false}
        />)

        // then
        expect(screen.getByTestId('test-type')).toHaveTextContent(mockTransaction.type)
        expect(screen.getByTestId('test-category')).toHaveTextContent(mockTransaction.category)
        expect(screen.getByTestId('test-amount')).toHaveTextContent(mockTransaction.amount)
    });
    it('renders input fields with error feedback', () => {
        // given
        const mockTransaction = useTransaction()

        // when
        const {container} = render(<FormBuilder
            transaction={mockTransaction}
            submit={jest.fn()}
            errors={true}
        />)

        // then
        expect(container.firstChild.firstChild).toHaveClass('add-transaction__error')
    });
    it('should submit transaction when save is clicked', () => {
        // given
        const mockTransaction = useTransaction()
        const mockSubmit = jest.fn()

        render(<FormBuilder
            transaction={mockTransaction}
            submit={mockSubmit}
            errors={false}
        />)

        // when
        fireEvent.click(screen.getByText('✓'))

        // then
        expect(mockSubmit).toBeCalledWith(mockTransaction)
    });
    it('should reset transaction when cancel is clicked', () => {
        // given
        const mockTransaction = useTransaction()

        render(<FormBuilder
            transaction={mockTransaction}
            submit={jest.fn()}
            errors={false}
        />)

        // when
        fireEvent.click(screen.getByText('✕'))

        // then
        expect(mockTransaction.reset).toBeCalled()
    });
})

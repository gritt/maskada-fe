import React from "react";
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import {Categories, CategoryInput} from "./CategoryInput";

describe('CategoryInput', () => {
    // given
    let givenTransaction = {
        decoration: jest.fn(),
        category: undefined,
        setCategory: jest.fn()
    }

    let givenRandomCategory = Categories[Math.floor(Math.random() * Categories.length)]

    it('renders with props', () => {
        // when
        render(<CategoryInput transaction={givenTransaction}/>)

        // then
        expect(givenTransaction.decoration).toBeCalled()
        expect(screen.getByRole('list').parentElement).toHaveClass('category-input')

        const gotCategories = screen.getAllByRole('listitem').map((el) => {
            return el.textContent
        })

        expect(gotCategories).toEqual(Categories)
    });
    it('renders with active category style', () => {
        // given
        givenTransaction.category = givenRandomCategory

        // when
        render(<CategoryInput transaction={givenTransaction}/>)

        // then
        expect(screen.getByText(givenTransaction.category)).toHaveClass('category-input--active')
    });
    it('should update the category when one is selected', () => {
        // given
        render(<CategoryInput transaction={givenTransaction}/>)

        // when
        fireEvent.click(screen.getByText(givenRandomCategory))

        // then
        expect(givenTransaction.setCategory).toBeCalledWith(givenRandomCategory)
    });
})

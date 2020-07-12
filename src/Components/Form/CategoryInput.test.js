import React from "react";
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import {Categories, CategoryInput} from "./CategoryInput";

describe('CategoryInput', () => {
    it('renders with props', () => {
        // given
        const givenTransaction = {
            decoration: jest.fn(),
            category: undefined,
            setCategory: jest.fn()
        }

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
        const randomIndex = Math.floor(Math.random() * Categories.length)
        const givenActiveCategory = Categories[randomIndex]

        const givenTransaction = {
            decoration: jest.fn(),
            category: givenActiveCategory,
            setCategory: jest.fn()
        }

        // when
        render(<CategoryInput transaction={givenTransaction}/>)

        // then
        expect(screen.getByText(givenActiveCategory)).toHaveClass('category-input--active')
    });
    it('should update the category when one is selected', () => {
        // given
        const randomIndex = Math.floor(Math.random() * Categories.length)
        const givenSelectedCategory = Categories[randomIndex]

        const givenTransaction = {
            decoration: jest.fn(),
            category: undefined,
            setCategory: jest.fn()
        }

        render(<CategoryInput transaction={givenTransaction}/>)

        // when
        fireEvent.click(screen.getByText(givenSelectedCategory))

        // then
        expect(givenTransaction.setCategory).toBeCalledWith(givenSelectedCategory)
    });
})

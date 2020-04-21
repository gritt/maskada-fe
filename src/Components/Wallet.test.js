import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {Wallet} from "./Wallet"
import {GetBalance, GetTimeline} from "../Services/Transaction"

jest.mock('../Services/Transaction')

describe('Wallet', () => {
    // given
    const givenActiveMonth = 'October 19'
    const givenTimeline = ['October 19', 'January 20']
    const givenBalance = 4050
    const givenTransactions = [{'some': 'transactions'}, {'test': 'foo'}]

    beforeAll(() => {
        GetTimeline.mockImplementation(() => {
            return givenTimeline
        })
        GetBalance.mockImplementation(() => {
            return givenBalance
        })
    })

    it('sets window title with the active month', () => {
        // when
        render(<Wallet transactions={[]} activeMonth={givenActiveMonth} setActiveMonth={jest.fn()}/>)

        // then
        expect(document.title).toEqual(givenActiveMonth)
    })
    it('renders timeline with active month', () => {
        // when
        render(<Wallet transactions={givenTransactions} activeMonth={givenActiveMonth} setActiveMonth={jest.fn()}/>)

        // then
        expect(GetTimeline).toBeCalledWith(givenTransactions)
        expect(screen.getByRole('list')).toHaveTextContent(givenTimeline[0])
        expect(screen.getByRole('list')).toHaveTextContent(givenTimeline[1])
        expect(screen.getByText(givenActiveMonth)).toHaveClass('months-nav__list--active')
    })
    it('renders balance with active month', () => {
        // when
        render(<Wallet transactions={givenTransactions} activeMonth={givenActiveMonth} setActiveMonth={jest.fn()}/>)

        // then
        expect(GetBalance).toBeCalledWith(givenActiveMonth, givenTransactions)
        expect(screen.getByRole('heading')).toHaveTextContent(`${givenBalance}`)
    });
    it('calls to change the active month when is clicked', () => {
        // given
        const givenSetActiveMonth = jest.fn()
        render(<Wallet transactions={[]} activeMonth={[]} setActiveMonth={givenSetActiveMonth}/>)

        // when
        fireEvent.click(screen.getByText(givenTimeline[1]))

        // then
        expect(givenSetActiveMonth).toBeCalledWith(givenTimeline[1])
    });
})

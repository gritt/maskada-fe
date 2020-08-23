import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {Wallet} from "./Wallet"
import {GetBalance, GetTimeline} from "../Services/Transaction"

jest.mock('../Services/Transaction')

describe('Wallet', () => {
    // given
    const givenActiveMonth = 'October 19'
    const givenTimeline = [
        'October 19',
        'January 20'
    ]

    const givenBalance = 4050

    const givenTransactions = [
        {'some': 'transactions'},
    ]

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
        render(<Wallet activeMonth={givenActiveMonth}/>)

        // then
        expect(document.title).toEqual(givenActiveMonth)
    })
    it('renders timeline with active month', () => {
        // when
        render(<Wallet transactions={givenTransactions} activeMonth={givenActiveMonth}/>)

        // then
        expect(GetTimeline).toBeCalledWith(givenTransactions)
        expect(screen.getByRole('list')).toHaveTextContent(givenTimeline[0])
        expect(screen.getByRole('list')).toHaveTextContent(givenTimeline[1])
        expect(screen.getByText(givenActiveMonth)).toHaveClass('months-nav__list--active')
    })
    it('renders balance with active month', () => {
        // when
        render(<Wallet transactions={givenTransactions} activeMonth={givenActiveMonth}/>)

        // then
        expect(GetBalance).toBeCalledWith(givenActiveMonth, givenTransactions)
        expect(screen.getByRole('heading')).toHaveTextContent(`${givenBalance}`)
    });
    it('should render balance with positive style', () => {
        // when
        render(<Wallet/>)

        // then
        expect(screen.getByRole('heading')).toHaveClass('account--positive')
    });
    it('should render balance with negative style', () => {
        // given
        GetBalance.mockImplementation(() => -500)

        // when
        render(<Wallet/>)

        // then
        expect(screen.getByRole('heading')).toHaveClass('account--negative')
    });
    it('should update the active month when clicked', () => {
        // given
        const givenSetActiveMonth = jest.fn()
        render(<Wallet setMonth={givenSetActiveMonth}/>)

        // when
        fireEvent.click(screen.getByText(givenTimeline[1]))

        // then
        expect(givenSetActiveMonth).toBeCalledWith(givenTimeline[1])
    });
})

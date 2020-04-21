import {ByMonthName, CREDIT, DEBIT, GetBalance, GetTimeline, GroupBy, INCOME} from "./Transaction"
import {GetMonthName} from "./Datetime"

describe('Transaction Service', () => {
    // given
    const testTransaction1 = {
        "id": 1,
        "amount": 4050,
        "type": INCOME,
        "date": "2019-10-23T16:35:13Z"
    }
    const testTransaction2 = {
        "id": 2,
        "amount": 300,
        "type": CREDIT,
        "date": "2020-01-25T16:35:13Z"
    }
    const testTransaction3 = {
        "id": 3,
        "amount": 78,
        "type": DEBIT,
        "date": "2020-01-27T00:00:13Z"
    }
    const givenTransactionList = [
        testTransaction1,
        testTransaction2,
        testTransaction3
    ]

    describe('GroupBy', () => {
        it('returns empty object when undefined is given', () => {
            // when
            const got = GroupBy(ByMonthName, undefined)

            // then
            expect(got).toEqual({})
        })
        it('returns empty object when empty list of transactions is given', () => {
            // when
            const got = GroupBy(ByMonthName, [])

            // then
            expect(got).toEqual({})
        })
        it('returns transactions grouped by collator fn when a list transactions is given', () => {
            // when
            const got = GroupBy(ByMonthName, givenTransactionList)

            // then
            const want = {
                "January 20": [testTransaction2, testTransaction3],
                "October 19": [testTransaction1]
            }
            expect(got).toEqual(want)
        })
    })
    describe('ByMonthName', () => {
        it('returns the transaction month name', () => {
            // when
            const got = ByMonthName(testTransaction1)

            // then
            expect(got).toEqual('October 19')
        })
    })
    describe('GetTimeline', () => {
        const givenCurrentMonth = GetMonthName(Date.now())

        it('return a list with the current month-year when a empty list of transactions is given', () => {
            // when
            const got = GetTimeline([])

            // then
            expect(got).toEqual([givenCurrentMonth])
        })
        it('returns a unique list of transactions month-year and current month-year when a list of transactions is given', () => {
            // given
            const given = GroupBy(ByMonthName, givenTransactionList)

            // when
            const got = GetTimeline(given)

            // then
            const want = [
                "October 19",
                "January 20",
                givenCurrentMonth
            ]
            expect(got).toEqual(want)
        })
    })
    describe('GetBalance', () => {
        it('returns ZERO when a month does not have transactions', () => {
            // when
            const got = GetBalance("March 20", [])

            // then
            expect(got).toEqual(0)
        })
        it('returns POSITIVE when INCOME is higher than DEBIT in the given month', () => {
            // given
            const given = {
                "April 20": [
                    {"amount": 1000, "type": INCOME},
                    {"amount": 150, "type": DEBIT},
                    {"amount": 200, "type": CREDIT}
                ]
            }
            // when
            const got = GetBalance("April 20", given)

            // then
            expect(got).toEqual(850)
        })
        it('returns NEGATIVE when the given month does not have transactions and previous month has CREDIT', () => {
            // given
            const given = {
                "April 20": [
                    {"amount": 1000, "type": INCOME},
                    {"amount": 150, "type": DEBIT},
                    {"amount": 200, "type": CREDIT}
                ]
            }
            // when
            const got = GetBalance("May 20", given)

            // then
            expect(got).toEqual(-200)
        })
        it('returns POSITIVE when the given month has higher INCOME than previous month CREDIT', () => {
            const given = {
                "April 20": [
                    {"amount": 1000, "type": INCOME},
                    {"amount": 150, "type": DEBIT},
                    {"amount": 200, "type": CREDIT}
                ],
                "May 20": [
                    {"amount": 500, "type": INCOME},
                    {"amount": 100, "type": CREDIT}
                ]
            }
            // when
            const got = GetBalance("May 20", given)

            // then
            expect(got).toEqual(300)
        })
        it('returns NEGATIVE when the given month has less INCOME than previous month CREDIT', () => {
            const given = {
                "April 20": [
                    {"amount": 1000, "type": INCOME},
                    {"amount": 150, "type": DEBIT},
                    {"amount": 200, "type": CREDIT}
                ],
                "May 20": [
                    {"amount": 100, "type": INCOME},
                    {"amount": 200, "type": DEBIT},
                    {"amount": 500, "type": CREDIT}
                ]
            }
            // when
            const got = GetBalance("May 20", given)

            // then
            expect(got).toEqual(-300)
        })
    })
})

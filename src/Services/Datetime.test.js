import {GetMonthName, GetPreviousMonthName} from "./Datetime"

describe("Datetime", () => {
    describe('GetMonthName', () => {
        it("returns month-year name when a datetime is given", () => {
            // given
            const given = "2020-01-23T16:35:13Z"

            // when
            const got = GetMonthName(given)

            // then
            expect(got).toEqual('January 20')
        })
    })
    describe('GetPreviousMonthName', () => {
        it('returns previous month-year name when a month-year is given', () => {
            // then
            expect(GetPreviousMonthName('March 20')).toEqual('February 20')
            expect(GetPreviousMonthName('February 20')).toEqual('January 20')
            expect(GetPreviousMonthName('January 20')).toEqual('December 19')
        })
    })
})

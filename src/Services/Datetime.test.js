import {GetMonthName} from "./Datetime";

describe("Datetime", () => {
    it("gets the month name when a datetime is given", () => {
        // given
        const given = "2020-01-23T16:35:13Z";

        // when
        const got = GetMonthName(given);

        // then
        const want = "January 20";
        expect(got).toBe(want);
    })
});
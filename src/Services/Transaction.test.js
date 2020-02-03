import {ByMonthName, GroupBy} from "./Transaction";

describe("Transaction", () => {
    it('returns empty object when a empty list of transactions is given', function () {
        // given
        const given = [];

        // when
        const got = GroupBy(ByMonthName, given);

        // then
        const want = {};
        expect(got).toEqual(want);
    });
    it('groups by month name when a list of transactions is given', function () {
        // given
        const given = [
            {
                "id": 1,
                "amount": 4050,
                "type": 3,
                "category": "Income",
                "date": "2019-10-23T16:35:13Z",
                "name": ""
            },
            {
                "id": 2,
                "amount": 300,
                "type": 2,
                "category": "Health",
                "date": "2020-01-25T16:35:13Z",
                "name": ""
            }
        ];

        // when
        const got = GroupBy(ByMonthName, given);

        // then
        const want = {
            "January 20": [{
                "amount": 300,
                "category": "Health",
                "date": "2020-01-25T16:35:13Z",
                "id": 2,
                "name": "",
                "type": 2
            }],
            "October 19": [{
                "amount": 4050,
                "category": "Income",
                "date": "2019-10-23T16:35:13Z",
                "id": 1,
                "name": "",
                "type": 3
            }]
        };
        expect(got).toEqual(want);
    })
});
import React from 'react';
import renderer from 'react-test-renderer';

import {Transactions} from "./Transactions";

const testTransactions = {
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

const testMonth = "January 20";

describe("Transactions", () => {
    it("renders scene with empty list", () => {
        // given
        const given = renderer.create(
            <Transactions transactions={[]} activeMonth={undefined}></Transactions>
        );

        // when
        const got = given.toJSON();

        // then
        expect(got).toMatchSnapshot();
    });
    it('renders scene with a list of transactions of the active month', () => {
        // given
        const given = renderer.create(
            <Transactions
                transactions={testTransactions}
                activeMonth={testMonth}>
            </Transactions>
        );

        // when
        const got = given.toJSON();

        // then
        expect(got).toMatchSnapshot();
    });
});
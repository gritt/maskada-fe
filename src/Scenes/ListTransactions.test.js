import React from "react";
import {render, screen} from "@testing-library/react";
import {ListTransactions} from "./ListTransactions";
import {View} from "../Components/TransactionView";

jest.mock("../Components/TransactionView")

describe('ListTransaction', () => {
    it('should render info message when no transactions are given', () => {
        // when
        render(<ListTransactions transactions={[]} collation={'test'}/>)

        // then
        expect(screen.getByText(`"if I don't buy anything, discount is bigger..."`)).toBeTruthy()
    });
    it('should render list of transactions when transactions are given', () => {
        // given
        let givenCollation = "April 20"
        let givenTransactions = {
            "April 20": [
                {"id": 0, "amount": 10, "type": "Income"},
                {"id": 1, "amount": 20, "type": "Debit"},
                {"id": 2, "amount": 30, "type": "Credit"}
            ]
        }

        View.mockImplementation((props) => {
            // then
            expect(props).toEqual(givenTransactions[givenCollation][props.id])
            return null
        })

        // when
        render(<ListTransactions transactions={givenTransactions} collation={givenCollation}/>)

        // then
        expect(View).toHaveBeenCalledTimes(3)
    });
});

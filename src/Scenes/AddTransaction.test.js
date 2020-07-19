import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";

import {AddTransaction} from "./AddTransaction";

import useTransaction from "../Components/Form/UseTransaction";
import {FormBuilder} from "../Components/Form/FormBuilder";
import {Loading, Success} from "../Components/Form/Animations";
import {Post} from "../Services/API";

jest.mock("../Components/Form/UseTransaction")
jest.mock("../Components/Form/FormBuilder")
jest.mock("../Components/Form/Animations")
jest.mock("../Services/API")

describe('AddTransaction', () => {
    // given
    const mockUseTransaction = {
        name: "mockTransaction",
        validate: jest.fn(),
        serialize: jest.fn()
    }

    beforeEach(() => {
        useTransaction.mockImplementation(() => {
            return mockUseTransaction
        })
        Loading.mockImplementation(() => null)
        Success.mockImplementation(() => null)

        Post.mockImplementation(jest.fn())
    })

    it('should render form with props', () => {
        // given
        FormBuilder.mockImplementation(({submit, transaction, errors}) => {
            // then
            expect(transaction).toEqual(useTransaction())
            expect(submit).toEqual(expect.any(Function));
            expect(errors).toBeFalsy()
            return null
        })

        // when
        renderHook(() => {
            render(<AddTransaction/>)
        })

        // then
        expect(useTransaction).toHaveBeenCalled()
        expect(FormBuilder).toHaveBeenCalled()
    });
    it('should render loading when create has been called back', () => {
        // given
        FormBuilder.mockImplementation(({submit, transaction}) => {
            return (
                <div data-testid={'test-submit'} onClick={() =>
                    submit(transaction)
                }/>
            )
        })

        render(<AddTransaction/>)

        // when
        fireEvent.click(screen.getByTestId('test-submit'))

        // then
        expect(mockUseTransaction.validate).toBeCalled()
        expect(Loading).toBeCalled()
    });
    it('should render form with errors when validate throws exception', () => {
        // given
        mockUseTransaction.validate.mockImplementation(() => {
            throw new Error('validation error')
        });

        FormBuilder
            .mockImplementationOnce(({submit, transaction, errors}) => {
                // then
                expect(errors).toBeFalsy()
                return (
                    <div data-testid={'test-submit'} onClick={() =>
                        submit(transaction)
                    }/>
                )
            })
            .mockImplementationOnce(({errors}) => {
                // then
                expect(errors).toBeTruthy()
                return null
            })

        render(<AddTransaction/>)

        // when
        fireEvent.click(screen.getByTestId('test-submit'))

        // then
        expect(mockUseTransaction.validate).toThrowError(Error('validation error'))
        expect(FormBuilder).toBeCalledTimes(2)
        expect(Loading).not.toBeCalled()
    });
});

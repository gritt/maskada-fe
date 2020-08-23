import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";

import {AddTransaction} from "./AddTransaction";

import useTransaction from "../Components/Form/UseTransaction";
import {FormBuilder} from "../Components/Form/FormBuilder";
import {Post} from "../Services/API";

jest.mock("../Components/Form/UseTransaction")
jest.mock("../Components/Form/FormBuilder")
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
        Post.mockImplementation(jest.fn())
    })

    afterEach(() => {
        jest.resetAllMocks()
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
        FormBuilder
            .mockImplementationOnce(({submit, transaction, loading}) => {
                // then
                expect(loading).toBeFalsy()
                return (
                    <div data-testid={'test-submit'} onClick={() =>
                        submit(transaction)
                    }/>
                )
            })
            .mockImplementationOnce(({loading}) => {
                // then
                expect(loading).toBeTruthy()
                return null
            })

        render(<AddTransaction/>)

        // when
        fireEvent.click(screen.getByTestId('test-submit'))

        // then
        expect(useTransaction).toHaveBeenCalled()
        expect(FormBuilder).toHaveBeenCalledTimes(2)
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
        expect(useTransaction).toHaveBeenCalled()
        expect(FormBuilder).toHaveBeenCalledTimes(2)
        expect(mockUseTransaction.validate).toHaveBeenCalled()
    });
    it('should render form with errors when post throws exception', () => {
        // given
        Post.mockImplementation(() => {
            throw new Error('API is down')
        })

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
        expect(useTransaction).toHaveBeenCalled()
        expect(FormBuilder).toHaveBeenCalledTimes(2)
        expect(mockUseTransaction.validate).toHaveBeenCalled()
        expect(Post).toHaveBeenCalled()
    });
    it('should render form with errors post callback returns error', () => {
        // given
        Post.mockImplementation((path, callback, transaction) => {
            callback({'status': 'error'}, new Error('error'))
        })

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
        expect(useTransaction).toHaveBeenCalled()
        expect(FormBuilder).toHaveBeenCalledTimes(2)
        expect(mockUseTransaction.validate).toHaveBeenCalled()
        expect(Post).toHaveBeenCalled()
    });
    it('should render success when post callback returns success', () => {
        // given
        const mockDoneCallback = jest.fn()

        mockUseTransaction.serialize.mockImplementation(() => {
            return {'mock': 'serialized transaction'}
        })

        Post.mockImplementation((path, callback, transaction) => {
            // then
            expect(path).toEqual('transaction')
            expect(callback).toEqual(expect.any(Function));
            expect(transaction).toEqual(mockUseTransaction.serialize())

            callback({'status': 'success'}, undefined)
        })

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

        render(<AddTransaction doneCallback={mockDoneCallback}/>)

        // when
        fireEvent.click(screen.getByTestId('test-submit'))

        // then
        expect(useTransaction).toHaveBeenCalled()
        expect(FormBuilder).toHaveBeenCalled()
        expect(mockUseTransaction.validate).toHaveBeenCalled()
        expect(Post).toHaveBeenCalled()
        expect(mockDoneCallback).toHaveBeenCalled()
    })
});

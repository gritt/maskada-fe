import {act, renderHook} from "@testing-library/react-hooks";
import {CREDIT, DEBIT, GetTypeName} from "../../Services/Transaction";
import {Categories} from "./CategoryInput";
import useTransaction from "./UseTransaction";

jest.mock('../../Services/Transaction')

describe('useTransaction', () => {
    it('should serialize transaction with state', () => {
        // given
        const {result} = renderHook(
            () => useTransaction()
        )
        act(() => {
            result.current.setType(DEBIT)
            result.current.setAmount(10)
            result.current.setCategory('Test')
        })

        // when
        let got = result.current.serialize()

        //then
        expect(got).toEqual({
            type: DEBIT,
            category: 'Test',
            amount: 10
        })
    });
    it('should get decoration style with type', () => {
        // given
        const {result} = renderHook(
            () => useTransaction()
        )

        GetTypeName.mockImplementationOnce(() => 'test')

        //when
        let got = result.current.decoration()

        //then
        expect(got).toEqual('transaction__type-test')
        expect(GetTypeName).toBeCalledWith(result.current.type)
    })
    it('should reset transaction to initial state', () => {
        // given
        const {result} = renderHook(
            () => useTransaction()
        )
        act(() => {
            result.current.setType(DEBIT)
            result.current.setAmount(10)
            result.current.setCategory('Test')
        })

        // when
        act(() => {
            result.current.reset()
        })

        // then
        expect(result.current.type).toEqual(CREDIT)
        expect(result.current.amount).toEqual(0)
        expect(result.current.category).toBeUndefined()
    });
    it('should throw validation err when invalid amount', () => {
        // given
        const {result} = renderHook(
            () => useTransaction()
        )

        // when / then
        expect(() => result.current.validate())
            .toThrowError(Error('invalid amount'))
    });
    it('should throw validation err when invalid type', () => {
        // given
        const {result} = renderHook(
            () => useTransaction()
        )
        act(() => {
            result.current.setAmount(10)
            result.current.setType(4)
        })

        // when / then
        expect(() => result.current.validate())
            .toThrowError(Error('invalid type'))
    });
    it('should throw validation err when invalid category', () => {
        // given
        const {result} = renderHook(
            () => useTransaction()
        )
        act(() => {
            result.current.setAmount(10)
        })

        // when / then
        expect(() => result.current.validate())
            .toThrowError(Error('invalid category'))
    });
    it('should not throw validation err when valid state', () => {
        // given
        let givenRandomCategory = Categories[Math.floor(Math.random() * Categories.length)]

        const {result} = renderHook(
            () => useTransaction()
        )
        act(() => {
            result.current.setAmount(10)
            result.current.setType(DEBIT)
            result.current.setCategory(givenRandomCategory)
        })

        // when / then
        expect(() => result.current.validate()).not.toThrowError(Error)
    });
})

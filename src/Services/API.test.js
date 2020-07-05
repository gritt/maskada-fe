import {BaseURL, Get, Post} from "./API"
import axios from "axios"

jest.mock('axios')

describe('API', () => {
    describe('Get', () => {
        beforeEach(
            jest.clearAllMocks
        )
        it('executes callback with response data when request succeeds', async () => {
            // given
            const givenResponse = {'data': {'some-response': 'some-value'}}
            const givenCallback = jest.fn()

            axios.get.mockImplementationOnce(() => Promise.resolve(givenResponse))

            // when
            await Get('transaction', givenCallback)

            // then
            expect(givenCallback).toBeCalledWith(givenResponse.data, undefined)
            expect(axios.get).toHaveBeenCalledWith(`${BaseURL}/transaction`)
        })
        it('executes callback with error when request fails', async (done) => {
            // given
            const givenError = new Error('Network Error');
            const givenCallback = jest.fn((data, error) => {
                // then
                expect(error).toEqual(givenError)
                expect(data).toBeUndefined()
                done()
            })

            axios.get.mockImplementationOnce(() => Promise.reject(givenError))

            // when
            await Get('transaction', givenCallback)

            // then
            expect(axios.get).toHaveBeenCalledWith(`${BaseURL}/transaction`)
        });
    })
    describe('Post', () => {
        beforeEach(
            jest.clearAllMocks
        )
        it('executes callback with response data when request succeeds', async () => {
            // given
            const givenPayload = {'data': {'some-payload': 'some-value'}}
            const givenResponse = {'data': {'some-response': 'some-value'}}
            const givenCallback = jest.fn()

            axios.post.mockImplementationOnce(() => Promise.resolve(givenResponse))

            // when
            await Post('transaction', givenCallback, givenPayload)

            // then
            expect(givenCallback).toBeCalledWith(givenResponse.data, undefined)
            expect(axios.post).toHaveBeenCalledWith(`${BaseURL}/transaction`, givenPayload)
        });
        it('executes callback with error when request fails', async(done) => {
            // when
            const givenPayload = {'data': {'some-payload': 'some-value'}}
            const givenError = new Error('Network Error');
            const givenCallback = jest.fn((data, error) => {
                // then
                expect(error).toEqual(givenError)
                expect(data).toBeUndefined()
                done()
            })

            axios.post.mockImplementationOnce(() => Promise.reject(givenError))

            // when
            await Post('transaction', givenCallback, givenPayload)

            // then
            expect(axios.post).toHaveBeenCalledWith(`${BaseURL}/transaction`, givenPayload)
        });
    })
})

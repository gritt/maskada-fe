import React from "react";
import {render,} from '@testing-library/react'
import {Loading, Success} from "./Animations";

describe('Animations', () => {
    it('renders loading', () => {
        // when
        let {container} = render(<Loading/>)

        // then
        expect(container).toMatchSnapshot()
    });
    it('renders success', () => {
        // when
        let {container} = render(<Success/>)

        // then
        expect(container).toMatchSnapshot()
    });
})

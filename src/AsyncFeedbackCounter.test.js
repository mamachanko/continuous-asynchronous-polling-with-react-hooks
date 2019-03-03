import React from 'react';
import {render, waitForElement} from "react-testing-library";
import AsyncFeedbackCounter from "./AsyncFeedbackCounter";

describe('AsyncFeedbackCounter', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    it('keeps incrementing', async () => {

        const getNextCounterMock = jest.fn().mockImplementation(
            (x) => Promise.resolve(x + 2)
        );

        // Another option:
        //
        // const getNextCounterMock = jest.fn()
        //     .mockResolvedValueOnce(123)
        //     .mockResolvedValueOnce(456)
        //     .mockResolvedValueOnce(789);

        const {getByText} = render(<AsyncFeedbackCounter getNextCounter={getNextCounterMock}/>);

        await waitForElement(() => getByText(/0/));

        jest.advanceTimersByTime(500);
        jest.useRealTimers();

        await waitForElement(() => getByText(/2/));

        jest.useFakeTimers();
        jest.advanceTimersByTime(500);
        jest.useRealTimers();

        await waitForElement(() => getByText(/4/));

        jest.useFakeTimers();
        jest.advanceTimersByTime(500);
        jest.useRealTimers();

        await waitForElement(() => getByText(/6/));

        expect(getNextCounterMock).toBeCalledTimes(3);
    })
});
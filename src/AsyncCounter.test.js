import React from 'react';
import {render, waitForElement} from "react-testing-library";
import AsyncCounter from "./AsyncCounter";

describe('AsyncCounter', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  it('keeps incrementing', async () => {

    const getNextCounterStub = jest.fn()
        .mockResolvedValueOnce(123)
        .mockResolvedValueOnce(456)
        .mockResolvedValueOnce(789);

    const {getByText} = render(<AsyncCounter getNextCounter={getNextCounterStub}/>);

    await waitForElement(() => getByText(/0/));

    jest.advanceTimersByTime(500);
    jest.useRealTimers();

    await waitForElement(() => getByText(/123/));

    jest.useFakeTimers();
    jest.advanceTimersByTime(500);
    jest.useRealTimers();

    await waitForElement(() => getByText(/456/));

    jest.useFakeTimers();
    jest.advanceTimersByTime(500);
    jest.useRealTimers();

    await waitForElement(() => getByText(/789/));
  })
});
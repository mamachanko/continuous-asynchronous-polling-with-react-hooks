import React, {useState, useEffect, useRef} from 'react';

const AsyncFeedbackCounter = ({getNextCounter}) => {
    const timeoutRef = useRef();
    const [counter, setCounter] = useState(0);
    const [advance, setAdvance] = useState(true);

    const asyncIncrement = async (currentCounter) => {
        const nextCounter = await getNextCounter(currentCounter);
        console.log(`${currentCounter} -> ${nextCounter}`);
        setCounter(nextCounter);
        setAdvance(false);
    };

    useEffect(() => {
        if (advance) {
            asyncIncrement(counter);
        } else {
            timeoutRef.current = setTimeout(
                () => setAdvance(true),
                500
            );
        }
        return () => clearTimeout(timeoutRef.current);
    }, [advance]);

    return <h1>{counter}</h1>;
};


export default AsyncFeedbackCounter;

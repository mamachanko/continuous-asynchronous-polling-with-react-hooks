import React, {useState, useEffect} from 'react';

const AsyncCounter = ({getNextCounter}) => {
    const [counter, setCounter] = useState(0);

    const asyncIncrement = async () => {
        const nextCounter = await getNextCounter();
        console.log(`-> ${nextCounter}`);
        setCounter(nextCounter);
    };

    useEffect(() => {
        const interval = setInterval(asyncIncrement, 500);
        return () => clearInterval(interval);
    }, []);

    return <h1>{counter}</h1>;
};


export default AsyncCounter;

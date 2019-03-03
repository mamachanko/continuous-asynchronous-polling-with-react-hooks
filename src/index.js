import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AsyncCounter from './AsyncCounter';
import * as serviceWorker from './serviceWorker';
import AsyncFeedbackCounter from "./AsyncFeedbackCounter";

ReactDOM.render(
    <div>
        <p>async counter:</p>
        <AsyncCounter getNextCounter={
            () => Promise.resolve(Math.random())
        }/>

        <p>async counter w/ feedback:</p>
        <AsyncFeedbackCounter getNextCounter={
            (counter) => Promise.resolve(counter + Math.random())
        }/>
    </div>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

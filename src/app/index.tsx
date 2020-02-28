import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/app.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { container } from './inversify.config';

import { Provider as InversifyProvider } from 'inversify-react';


ReactDOM.render(
    <InversifyProvider container={container}>
        <App />
    </InversifyProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

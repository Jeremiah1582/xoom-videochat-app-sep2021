import React from 'react';
import ReactDom from "react-dom";

import App from './App';
import './style.css';
import {ContextProvider} from './socketContext'


ReactDom.render(
    <ContextProvider>
    <App />
    </ContextProvider>,

document.getElementById('root'));

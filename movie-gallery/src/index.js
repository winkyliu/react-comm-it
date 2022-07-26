import React, { createContext } from "react";
import { render } from 'react-dom';
//import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import App from './App';
import reportWebVitals from './reportWebVitals';

import Navigator from "./navigator";

const rootElement = document.getElementById('root');
render(
    <Navigator />,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

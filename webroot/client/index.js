import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import Routes from './app';
const App = () => <BrowserRouter><Routes /></BrowserRouter>
;ReactDOM.render(<App />, document.getElementById("root"));
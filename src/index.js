import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import Screen from "./classes/Screen";



ReactDOM.render(
  <React.StrictMode>
   <Screen/>
  </React.StrictMode>,
  document.getElementById('screen-wizard')
);

reportWebVitals();

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';

/**
  * Application entrypoint
  */
render((
  <BrowserRouter>
    <App apiUrl="http://localhost:8081"/>
  </BrowserRouter>
), document.getElementById('root'));

module.hot.accept();

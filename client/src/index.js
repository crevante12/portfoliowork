import React from 'react' // Step 1
import ReactDOM from 'react-dom' // Step 2
import App from './App.js' // Step 3
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
		<App />
  </BrowserRouter>
);
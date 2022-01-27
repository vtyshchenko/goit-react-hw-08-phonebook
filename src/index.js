import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import './index.scss';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();

/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import 'isomorphic-fetch';
import 'bootstrap';
/*eslint-enable no-unused-vars*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import App from './components/App';
import reducer from './reducer';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware,
)(createStore);

const store = createStoreWithMiddleware(combineReducers({
  todo: reducer,
  form: formReducer
}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

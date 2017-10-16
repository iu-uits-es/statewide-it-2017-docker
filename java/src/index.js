/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import 'isomorphic-fetch';
/*eslint-enable no-unused-vars*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import App from './main/js/App';
import reducer from './main/js/reducer';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './main/js/index.css';

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

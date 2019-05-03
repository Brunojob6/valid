// @flow
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import sagas from '../sagas';

export const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history)];

middleware.push(logger);

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(sagas);

export default store;

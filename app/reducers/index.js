// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import common from './common';
import student from './student';


const rootReducer = combineReducers({
  counter,
  common,
  student,
  router
});

export default rootReducer;

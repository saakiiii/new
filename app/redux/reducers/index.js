"use client"

// reducers/index.js
import { combineReducers } from 'redux';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  search: searchReducer,
});

export default rootReducer;

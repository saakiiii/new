"use client"
// store/counter1Store.js
// import { confi } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import searchReducer from '../reducers/searchReducer';

const storeDefault = configureStore({reducer:{
    searchReducer,
}});

export default storeDefault;
import { configureStore } from '@reduxjs/toolkit'
import userSlice  from './reducers/user'
import promise from 'redux-promise';
import { combineReducers, compose } from 'redux';
import  channelsReducer  from './reducers/channels';
import  configReducer  from './reducers/config';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true, 
    traceLimit: 25 
}) : compose;

export const store = configureStore({
    reducer: combineReducers({
        user:userSlice,
        channels:channelsReducer,
        config:configReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false

    }).concat(promise),
    devTools:composeEnhancers
})
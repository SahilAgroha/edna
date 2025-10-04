import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { thunk } from "redux-thunk";
import { TypedUseSelectorHook } from "react-redux";

import microbiomeReducer from './microbiomeSlice';

const rootReducer=combineReducers({
    microbiome: microbiomeReducer,
})

const store=configureStore({
    reducer:rootReducer,
    
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
})

export type AppDispatch=typeof store.dispatch;
export type RootState=ReturnType<typeof rootReducer>;

export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
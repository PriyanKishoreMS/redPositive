import {configureStore} from '@reduxjs/toolkit';
import formReducer from "./slices/formSlice"
import thunkMiddleware from 'redux-thunk'

export const store = configureStore({
    reducer: {
      form: formReducer
    },
    middleware: [thunkMiddleware],
});
//import counterReducer from '../features/counter/counterSlice';
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import questionReducer from '../features/question/questionSlice';

export const store = configureStore({
    reducer: {
        //counter: counterReducer,
        app: appReducer,
        auth: authReducer,
        user: userReducer,
        question: questionReducer
    },
});

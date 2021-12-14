//import counterReducer from '../features/counter/counterSlice';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import questionReducer from '../features/question/questionSlice';

export const store = configureStore({
    reducer: {
        //counter: counterReducer,
        auth: authReducer,
        user: userReducer,
        question: questionReducer
    },
});

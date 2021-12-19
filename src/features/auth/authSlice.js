import { createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = 'auth'

const initialState = {
    user: null
};

export const authSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        signin: (state, action) => {
            state.user = action.payload
        },
        signout: (state) => {
            state.user = null
        }
    }
})

export const { signin, signout } = authSlice.actions

export const selectAuthUser = (state) => {
    const authUser = state.auth.user
    return authUser ? state.user.users[authUser.id] : null
}

export default authSlice.reducer
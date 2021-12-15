import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from '../../utils/_DATA'

const SLICE_NAME = 'user'

const initialState = {
    users: {},
    loading: true
};

export const fetchUsers = createAsyncThunk(`${SLICE_NAME}/fetchUsers`, async () => {
    const response = await _getUsers()
    return response
})

export const userSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        }).addCase(fetchUsers.fulfilled, (state, action) => ({
            ...state,
            loading: false,
            users: { ...state.users, ...action.payload }
        }))
    }
})

export const selectUsers = (state) => state.user.users

export const selectStatus = (state) => state.user.loading

export default userSlice.reducer
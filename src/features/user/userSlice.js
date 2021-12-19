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
    reducers: {
        saveUserAnswer: (state, action) => {
            const { users } = state
            const { authedUser, qid, answer } = action.payload
            return {
                ...state,
                users: {
                    ...users,
                    [authedUser]: {
                        ...users[authedUser],
                        answers: {
                            ...users[authedUser].answers,
                            [qid]: answer
                        }
                    }
                }
            }
        }
    },
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

export const { saveUserAnswer } = userSlice.actions

export default userSlice.reducer
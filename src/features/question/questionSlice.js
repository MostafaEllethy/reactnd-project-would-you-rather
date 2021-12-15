import {
    createAsyncThunk,
    createSelector,
    createSlice
} from "@reduxjs/toolkit";
import {
    _getQuestions
} from '../../utils/_DATA'
import {selectAuthUser} from '../auth/authSlice'

const SLICE_NAME = 'question'

const initialState = {
    questions: {},
    loading: true
};

export const fetchQuestions = createAsyncThunk(`${SLICE_NAME}/fetchQuestions`, async () => {
    const response = await _getQuestions()
    return response
})

export const questionSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.pending, (state) => {
            state.loading = true
        }).addCase(fetchQuestions.fulfilled, (state, action) => ({
            ...state,
            loading: false,
            questions: {
                ...state.questions,
                ...action.payload
            }
        }))
    }
})

export const selectQuestions = (state) => state.question.questions

export const selectStatus = (state) => state.question.loading

export const selectUnansweredQuestions = createSelector([selectAuthUser, selectQuestions], (authUser, questions) => {
    const qIds = Object.keys(authUser.answers)
    return Object.values(questions).filter(q => !qIds.includes(q.id)).sort((a, b) => b.timestamp - a.timestamp)
})

export const selectAnsweredQuestions = createSelector([selectAuthUser, selectQuestions], (authUser, questions) => {
    const qIds = Object.keys(authUser.answers)
    return Object.values(questions).filter(q => qIds.includes(q.id)).sort((a, b) => b.timestamp - a.timestamp)
})

export default questionSlice.reducer
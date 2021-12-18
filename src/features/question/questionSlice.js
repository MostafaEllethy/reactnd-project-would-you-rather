import {
    createAsyncThunk,
    createSelector,
    createSlice
} from "@reduxjs/toolkit";
import {
    _getQuestions,
    _saveQuestion
} from '../../utils/_DATA'
import { selectAuthUser } from '../auth/authSlice'

const SLICE_NAME = 'question'

const initialState = {
    questions: {},
    saving: false,
    loading: true
};

export const fetchQuestions = createAsyncThunk(`${SLICE_NAME}/fetchQuestions`, async () => await _getQuestions())

export const saveQuestion = createAsyncThunk(`${SLICE_NAME}/saveQuestion`, async (payload, store) => await _saveQuestion({ ...payload, author: store.getState().auth.user.id }))

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
        builder.addCase(saveQuestion.pending, (state) => {
            state.saving = true
        }).addCase(saveQuestion.fulfilled, (state, action) => {
            const question = action.payload
            return {
                ...state,
                questions: {
                    ...state.questions,
                    [question.id]: question
                },
                saving: false
            }
        })
    }
})

export const selectQuestions = (state) => state.question.questions

export const selectStatus = (state) => state.question.loading

export const selectSaving = (state) => state.question.saving

export const selectUnansweredQuestions = createSelector([selectAuthUser, selectQuestions], (authUser, questions) => {
    const qIds = Object.keys(authUser.answers)
    return Object.values(questions).filter(q => !qIds.includes(q.id)).sort((a, b) => b.timestamp - a.timestamp)
})

export const selectAnsweredQuestions = createSelector([selectAuthUser, selectQuestions], (authUser, questions) => {
    const qIds = Object.keys(authUser.answers)
    return Object.values(questions).filter(q => qIds.includes(q.id)).sort((a, b) => b.timestamp - a.timestamp)
})

export default questionSlice.reducer
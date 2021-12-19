import {
    createAsyncThunk,
    createSelector,
    createSlice
} from "@reduxjs/toolkit";
import {
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from '../../utils/_DATA'
import { selectAuthUser } from '../auth/authSlice'
import { saveUserAnswer } from "../user/userSlice";

const SLICE_NAME = 'question'

const initialState = {
    questions: {},
    saving: false,
    savingAnswer: false,
    loading: true
};

export const fetchQuestions = createAsyncThunk(`${SLICE_NAME}/fetchQuestions`, async () => await _getQuestions())

export const saveQuestion = createAsyncThunk(`${SLICE_NAME}/saveQuestion`, async (payload, store) => await _saveQuestion({ ...payload, author: store.getState().auth.user.id }))

export const saveQuestionAnswer = createAsyncThunk(`${SLICE_NAME}/saveQuestionAnswer`, async (payload, store) => {
    payload = { ...payload, authedUser: store.getState().auth.user.id }
    await _saveQuestionAnswer(payload);
    store.dispatch(saveUserAnswer(payload))
    return payload
})

export const questionSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.pending, (state) => ({
            ...state,
            loading: true
        })).addCase(fetchQuestions.fulfilled, (state, action) => ({
            ...state,
            loading: false,
            questions: {
                ...state.questions,
                ...action.payload
            }
        })).addCase(saveQuestion.pending, (state) => {
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
        }).addCase(saveQuestionAnswer.pending, state => ({ ...state, savingAnswer: true })).addCase(saveQuestionAnswer.fulfilled, (state, action) => {
            const { answer, authedUser, qid } = action.payload
            const { questions } = state
            return {
                ...state, savingAnswer: false, questions: {
                    ...questions,
                    [qid]: {
                        ...questions[qid],
                        [answer]: {
                            ...questions[qid][answer],
                            votes: questions[qid][answer].votes.concat([authedUser])
                        }
                    }
                }
            }
        })
    }
})

export const selectQuestions = (state) => state.question.questions

export const selectStatus = (state) => state.question.loading

export const selectSavingAnswer = (state) => state.question.savingAnswer

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
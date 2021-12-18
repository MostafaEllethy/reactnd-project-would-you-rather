import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    snackBarText: ''
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSnackBarText: (state, action) => {
            state.snackBarText = action.payload
        }
    }
})

export const selectSnackBarText = (state) => state.app.snackBarText

export const { setSnackBarText } = appSlice.actions

export default appSlice.reducer
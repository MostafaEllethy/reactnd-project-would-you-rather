import { useDispatch, useSelector } from 'react-redux'
import { selectSnackBarText, setSnackBarText } from '../../app/appSlice'
import { Snackbar, Alert } from '@mui/material'

const SnackbarHandler = () => {
    const dispatch = useDispatch()
    const snackBarText = useSelector(selectSnackBarText)

    const handleSnackBarClose = (e, reason) => {
        if (reason === 'timeout') dispatch(setSnackBarText(''))
    }

    return <Snackbar open={snackBarText !== ''} autoHideDuration={6000} onClose={handleSnackBarClose}>
        <Alert severity="error">{snackBarText}</Alert>
    </Snackbar>
}

export default SnackbarHandler
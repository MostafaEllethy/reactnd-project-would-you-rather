import { useParams, Navigate } from 'react-router-dom'
import { CardContent, CardHeader, Typography, Button, Grid, Box, Avatar, Divider, Radio, FormControl, RadioGroup, FormControlLabel } from '@mui/material'
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { grey } from '@mui/material/colors'
import { selectUsers } from '../features/user/userSlice'
import { selectQuestions } from '../features/question/questionSlice'
import { setSnackBarText } from '../app/appSlice'

const Question = () => {
    const dispatch = useDispatch()
    const { question_id } = useParams()
    const question = useSelector(selectQuestions)[question_id]
    const users = useSelector(selectUsers)
    const [option, setOption] = useState(null)
    if (!question) {
        return <Navigate to="/404" replace={true} />
    }

    const user = users[question.author]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!option) { dispatch(setSnackBarText("Please select an option before submit!")); return; }
        // {qid, answer}
    }

    return <Fragment>
        <CardHeader component={() => (<Typography variant='subtitle2' sx={{ backgroundColor: grey[100], padding: 1.5, borderBottom: 1, borderColor: 'divider', fontWeight: 600 }}>
            {user.name} asks:
        </Typography>)} />
        <CardContent>
            <Grid container sx={{ alignItems: 'middle' }}>
                <Grid item xs={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img alt={`${user.name} avatar`} src={user.avatarURL} width='150' />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ padding: 1 }}>
                            <Typography variant='h5' sx={{ fontWeight: 600 }}>
                                Would You Rather ...
                            </Typography>
                            <FormControl>
                                <RadioGroup value={option} onChange={(e) => setOption(e.target.value)} >
                                    <FormControlLabel value="optionOne" control={<Radio size='small' />} label={question['optionOne'].text} />
                                    <FormControlLabel value="optionTwo" control={<Radio size='small' />} label={question['optionTwo'].text} />
                                </RadioGroup>
                            </FormControl>
                            <Button variant='contained' sx={{ mt: 2 }} color='success' type='submit' fullWidth>
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </CardContent>
    </Fragment>
}

export default Question
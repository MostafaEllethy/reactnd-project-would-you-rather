import { useParams, Navigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import { CardContent, CardHeader, Typography, Grid, Box, Divider, Radio, FormControl, RadioGroup, FormControlLabel, Card } from '@mui/material'
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { grey } from '@mui/material/colors'
import { selectAuthUser } from '../features/auth/authSlice'
import { selectUsers } from '../features/user/userSlice'
import { saveQuestionAnswer, selectQuestions, selectSavingAnswer } from '../features/question/questionSlice'
import { setSnackBarText } from '../app/appSlice'
import ResultItem from '../features/question/ResultItem'

const Question = () => {
    const dispatch = useDispatch()
    const saving = useSelector(selectSavingAnswer)
    const { question_id } = useParams()
    const question = useSelector(selectQuestions)[question_id]
    const users = useSelector(selectUsers)
    const [option, setOption] = useState(null)
    const [answer, setAnswer] = useState(null)
    const authUser = useSelector(selectAuthUser)

    useEffect(() => {
        setAnswer(authUser.answers[question_id])
    }, [authUser])

    if (!question) {
        return <Navigate to="/404" replace={true} />
    }

    const user = users[question.author]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!option) { dispatch(setSnackBarText("Please select an option before submit!")); return; }

        dispatch(saveQuestionAnswer({ qid: question_id, answer: option }))
    }

    const votesCount = question.optionOne.votes.length + question.optionTwo.votes.length

    return <Fragment>
        <CardHeader component={() => (<Typography variant='subtitle2' sx={{ backgroundColor: grey[100], padding: 1.5, borderBottom: 1, borderColor: 'divider', fontWeight: 600 }}>
            {answer ? `Asked by ${user.name}` : `${user.name} asks`}:
        </Typography>)} />
        <CardContent>
            <Grid container sx={{ alignItems: 'middle' }} spacing={1}>
                <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img alt={`${user.name} avatar`} src={user.avatarURL} width='150' />
                </Grid>
                <Divider orientation="vertical" flexItem />
                {answer ? (
                    <Grid item xs>
                        <Typography variant='h5' sx={{ fontWeight: 600, mb: 1.5 }}>
                            Results
                        </Typography>
                        <Grid container direction='column' spacing={1.5}>
                            <ResultItem option={question.optionOne} votesCount={votesCount} vote={answer == 'optionOne'} />
                            <ResultItem option={question.optionTwo} votesCount={votesCount} vote={answer == 'optionTwo'} />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item xs>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ padding: 1 }}>
                                <Typography variant='h5' sx={{ fontWeight: 600 }}>
                                    Would You Rather ...
                                </Typography>
                                <FormControl disabled={saving}>
                                    <RadioGroup value={option} onChange={(e) => setOption(e.target.value)} >
                                        <FormControlLabel value="optionOne" control={<Radio size='small' />} label={question['optionOne'].text} />
                                        <FormControlLabel value="optionTwo" control={<Radio size='small' />} label={question['optionTwo'].text} />
                                    </RadioGroup>
                                </FormControl>
                                <LoadingButton variant='contained' sx={{ mt: 2 }} color='success' type='submit' loading={saving} fullWidth>
                                    Submit
                                </LoadingButton>
                            </Box>
                        </form>
                    </Grid>
                )}
            </Grid>
        </CardContent>
    </Fragment>
}

export default Question
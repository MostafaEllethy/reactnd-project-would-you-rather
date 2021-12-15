import { Grid, Card, CardActionArea, CardHeader, CardContent, Typography, Box, Divider, Avatar, Button } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const QuestionsListItem = ({ question }) => {
    const user = useSelector(state => state.user.users[question.author])
    const navigate = useNavigate()
    const handleOnClick = () => {
        navigate(`/questions/${question.id}`)
    }
    return (
        <Grid item xs={12} >
            <Card sx={{ border: 1, borderColor: 'divider', boxShadow: 0 }} >
                <CardActionArea onClick={handleOnClick}>
                    <CardHeader component={() => (<Box sx={{ backgroundColor: grey[100], padding: 1.5, borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                            {user.name} asks:
                        </Typography>
                    </Box>)} />
                    <CardContent>
                        <Grid container sx={{ alignItems: 'middle' }}>
                            <Grid item xs={5} >
                                <Avatar alt={`${user.name} avatar`} src={user.avatarURL} sx={{ margin: 'auto', height: 92, width: 92 }} />
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item xs>
                                <Box sx={{ padding: 1 }}>
                                    <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                                        Would you rather
                                    </Typography>
                                    <Typography variant='body2'>
                                        {question.optionOne.text} | {question.optionTwo.text}
                                    </Typography>
                                    <Button variant='outlined' sx={{ mt: 2 }} fullWidth>
                                        View Poll
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default QuestionsListItem
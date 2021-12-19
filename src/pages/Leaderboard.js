import { CardContent, Grid, Card, Badge, Divider, Typography, CardHeader } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useSelector } from "react-redux"
import { selectUsers } from "../features/user/userSlice"

const Leaderboard = () => {
    const users = Object.values(useSelector(selectUsers)).sort((a, b) => (Object.values(b.answers).length + Object.values(b.questions).length) - (Object.values(a.answers).length + Object.values(a.questions).length))
    return <CardContent>
        <Grid container direction='column' rowSpacing={2}>
            {users.map((user, index) => {
                return <Grid item key={user.id} xs>
                    <Badge badgeContent={index + 1} anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }} color='secondary' sx={{ width: '100%' }}>
                        <Card sx={{ border: 1, borderColor: 'divider', width: '100%' }} variant='outline'>
                            <CardContent>
                                <Grid container direction='row' columnSpacing={2}>
                                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img alt={`${user.name} avatar`} src={user.avatarURL} width='96' />
                                    </Grid>
                                    <Divider orientation="vertical" flexItem />
                                    <Grid item xs>
                                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                            {user.name}
                                        </Typography>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        Answered Questions:
                                                    </td>
                                                    <td>
                                                        <strong>
                                                            {Object.values(user.answers).length}
                                                        </strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Created Questions:
                                                    </td>
                                                    <td>
                                                        <strong>
                                                            {Object.values(user.questions).length}
                                                        </strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Card variant='outlined'>
                                            <CardHeader component={() => <Typography variant='subtitle1' sx={{ fontWeight: 500, textAlign: 'center', paddingY: 1.25, borderBottom: 1, borderColor: 'divider', backgroundColor: grey[50] }}>Score</Typography>} />
                                            <Typography variant="h6" sx={{ textAlign: 'center', py: 1.5 }}>
                                                {(Object.values(user.answers).length + Object.values(user.questions).length)}
                                            </Typography>
                                        </Card>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Card>
                    </Badge>
                </Grid>
            })}
        </Grid>
    </CardContent>
}

export default Leaderboard
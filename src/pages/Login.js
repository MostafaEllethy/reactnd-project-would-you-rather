import logo from '../logo.svg'
import { useSelector } from "react-redux"
import { useAuth } from '../features/auth'
import { grey, deepPurple } from '@mui/material/colors';
import { selectStatus, selectUsers } from '../features/user/userSlice'
import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardActions, CardContent, Button, Grid, CardHeader, Typography, Box, Autocomplete, TextField, LinearProgress, Snackbar, Alert } from "@mui/material";
import { useState, Fragment } from 'react';

const Login = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const usersLoading = useSelector(selectStatus)
    const users = Object.values(useSelector(selectUsers))
    const [user, setUser] = useState(null)
    const [openSnackBar, setOpenSnackBar] = useState(false)

    const signIn = () => {
        if (!user) {
            setOpenSnackBar(true)
            return;
        }
        auth.signin(user)
        navigate(from, { replace: true })
    }

    const handleSetUser = (e, val) => {
        e.preventDefault();
        setUser(val)
    }

    const handleSnackBarClose = (e, reason) => {
        if(reason === 'timeout') setOpenSnackBar(false)
    }

    return (
        <Fragment>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert severity="error">Please select user from the list!</Alert>
            </Snackbar>
            <Grid container direction='row' justifyContent='center' alignItems='center'>
                <Grid item xs={5}>
                    <Card variant='outlined'>
                        <CardHeader component={() => (
                            <Box sx={{ textAlign: 'center', backgroundColor: grey[100], pt: '0.5rem', pb: '0.5rem' }}>
                                <Typography sx={{ fontWeight: 500 }} variant="h6" component='h2'>
                                    Welcome to Would You Rather App!
                                </Typography>
                                <Typography color="text.secondary">
                                    Please sign in to continue
                                </Typography>
                            </Box>
                        )} />
                        <CardContent sx={{ textAlign: 'center', pt: 0, pb: 1 }}>
                            <img src={logo} className="App-logo" alt="logo" width='175' />
                            {usersLoading ? (
                                <LinearProgress color='inherit' sx={{ color: deepPurple[500] }} />
                            ) : (<Autocomplete size='small' options={users} renderOption={(props, option) => {
                                return <Box component="li" {...props}>
                                    <img loading="lazy" width="30" src={option.avatarURL} srcSet={option.avatarURL} alt={`${option.name} avatar`} /> {option.name}</Box>
                            }} getOptionLabel={(option) => option.name} loading disableClearable autoHighlight openOnFocus disablePortal renderInput={(params) => <TextField {...params} color='success' label="Select User" />}
                                onChange={handleSetUser} />)}
                        </CardContent>
                        <CardActions>
                            <Button variant='outlined' color="success" fullWidth onClick={signIn}>Sign In</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Fragment >
    )
}

export default Login
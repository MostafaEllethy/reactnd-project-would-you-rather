import React, { useEffect } from 'react';
import { ADD_QUESTION, LEADERBOARD, LOGIN, QUESTION } from './routes'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import NewQuestion from './pages/NewQuestion'
import Leaderboard from './pages/Leaderboard'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './features/user/userSlice';
import { grey } from '@mui/material/colors';
import { Grid, CircularProgress, Box } from "@mui/material";
import NotFound from './pages/404'
import Question from './pages/Question'
import { selectStatus, fetchQuestions } from './features/question/questionSlice';
import { selectAuthUser } from './features/auth/authSlice';
import Layout from './layouts/MainLayout'
import SnackbarHandler from './features/snackbar-handler/SnackbarHandler'

function App() {
    const location = useLocation()
    const dispatch = useDispatch();
    const questionsLoading = useSelector(selectStatus)
    const authUser = useSelector(selectAuthUser)
    useEffect(() => { dispatch(fetchUsers()); dispatch(fetchQuestions()) }, [dispatch])
    return (
        <Grid sx={{ backgroundColor: grey[50], minHeight: '100vh' }}>
            <SnackbarHandler />
            {authUser ? (
                questionsLoading ? (
                    <Box sx={{ textAlign: 'center', pt: '10vmin' }}>
                        <CircularProgress />
                    </Box >
                ) : (
                    <Layout>
                        <Routes>
                            <Route path='/' element={<Home />} exact />
                            <Route path={ADD_QUESTION} element={<NewQuestion />} exact />
                            <Route path={LEADERBOARD} element={<Leaderboard />} exact />
                            <Route path={QUESTION} element={<Question />} exact />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Layout>
                )
            ) : (
                <Routes>
                    <Route path={LOGIN} element={<Login />} exact />
                    <Route path="*" element={<Navigate to={LOGIN} state={{ from: location }} />} />
                </Routes>
            )}
        </Grid>
    );
}

export default App;

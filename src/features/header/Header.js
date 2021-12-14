import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { ADD_QUESTION, LEADERBOARD } from '../../routes'
import { Logout } from '@mui/icons-material';
import NavButton from './NavButton'
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthUser, signout } from './../auth/authSlice'

const Header = () => {
    const dispatch = useDispatch()

    const user = useSelector(selectAuthUser)

    return <AppBar position='sticky' sx={{ mb: '5vmin' }}>
        <Typography variant='h3' component='h1' align='center' sx={{ padding: '2.5vmin', fontWeight: 'bold' }}>
            Would You Rather
        </Typography>
        <Toolbar variant='dense' sx={{ backgroundColor: 'white', justifyContent: 'space-around', alignItems: 'center' }}>
            <Box>
                <NavButton to='/' label='Home' />
                <NavButton to={ADD_QUESTION} label='New Question ' />
                <NavButton to={LEADERBOARD} label='Leaderboard' />
            </Box>
            <Box sx={{ display: 'flex' }}>
                <Typography color='black' variant='body2' sx={{ ml: 3 }}>
                    Hello, {user.name} <img loading="lazy" width="35" src={user.avatarURL} srcSet={user.avatarURL} alt={`${user.name} avatar`} style={{ verticalAlign: 'middle' }} />
                </Typography>
                <Button sx={{ color: 'text.secondary', ml: 0.5 }} startIcon={<Logout />} onClick={() => dispatch(signout())}>
                    Logout
                </Button>
            </Box>
        </Toolbar>
    </AppBar>
}

export default Header
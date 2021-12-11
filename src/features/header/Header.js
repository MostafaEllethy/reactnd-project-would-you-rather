import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ADD_QUESTION, LEADERBOARD } from '../../routes'
import { Fragment } from 'react'
import { Logout } from '@mui/icons-material';
import { useAuth } from '../auth'
import NavButton from './NavButton'
//import styles from './Header.module.scss';

const Header = () => {
    const auth = useAuth();
    const user = auth.user

    return <AppBar position='sticky' sx={{ mb: '3vmin' }}>
        <Typography variant='h3' component='h1' align='center' sx={{ padding: '2.5vmin', fontWeight: 'bold' }}>
            Would You Rather
        </Typography>
        <Toolbar variant='dense' sx={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <NavButton to='/' label='Home' />
            <NavButton to={ADD_QUESTION} label='New Question ' />
            <NavButton to={LEADERBOARD} label='Leaderboard' />
            {user && (
                <Fragment>
                    <Typography color='black' variant='body2' sx={{ml: 3}}>
                        Hello, {user.name} <img loading="lazy" width="35" src={user.avatarURL} srcSet={user.avatarURL} alt={`${user.name} avatar`} style={{ verticalAlign: 'middle' }} />
                    </Typography>
                    <Button sx={{ color: 'text.secondary', ml: 0.5 }} startIcon={<Logout />} onClick={auth.signout}>
                        Logout
                    </Button>
                </Fragment>
            )}
        </Toolbar>
    </AppBar>
}

export default Header
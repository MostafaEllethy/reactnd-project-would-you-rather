import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
//import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import { ADD_QUESTION, LEADERBOARD } from '../../routes'
//import styles from './Header.module.scss';

const Header = () => {
    return <AppBar position='sticky' sx={{ boxShadow: 1 }}>
        <Typography variant='h3' component='h1' align='center' sx={{ padding: '5vmin', fontWeight: 'bold' }}>
            Would You Rather
        </Typography>


        <Toolbar variant='dense' sx={{ background: 'white' }}>
            <NavLink to='/'>
                Home
            </NavLink>
            <NavLink to={ADD_QUESTION}>
                New Question
            </NavLink>
            <NavLink to={LEADERBOARD}>
                Leaderboard
            </NavLink>
        </Toolbar>
    </AppBar>
}

export default Header
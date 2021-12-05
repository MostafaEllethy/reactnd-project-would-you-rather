import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
//import styles from './Header.module.scss';

const Header = () => {
    return <AppBar position='fixed' sx={{ boxShadow: 1 }}>
        <Typography variant='h3' component='h1' align='center' sx={{ padding: '5vmin', fontWeight: 'bold', color: 'primary.main', background: 'white' }}>
            Would You Rather
        </Typography>
        <Toolbar variant='dense'>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                qwe
            </IconButton>
            <Typography variant="h6" color="inherit" component="a" href='#'>
                Photos
            </Typography>
        </Toolbar>
    </AppBar>
}

export default Header
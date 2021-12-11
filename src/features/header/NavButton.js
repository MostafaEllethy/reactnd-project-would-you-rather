import { NavLink, useMatch, useResolvedPath } from 'react-router-dom'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'

const NavButton = (props) => {
    const { to, label } = props
    const match = useMatch({ path: useResolvedPath(to).pathname })
    return <Button {...props} component={NavLink} variant={match ? 'contained' : 'outlined'} sx={{ marginRight: 1 }} disableElevation>
        {label}
    </Button>
}

NavButton.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}

export default NavButton
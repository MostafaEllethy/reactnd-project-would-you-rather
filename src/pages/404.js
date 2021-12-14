import { CardContent, Typography} from '@mui/material'

const NotFound = () => {
    return <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant='h3' >
           404 - PAGE NOT FOUND!
        </Typography>
        <Typography>
            The page you are looking for doesn't exist.
        </Typography>
    </CardContent>
}

export default NotFound
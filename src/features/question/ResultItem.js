import { Card, Grid, Typography, LinearProgress, Chip } from '@mui/material'
import { grey, cyan } from '@mui/material/colors'
import PropTypes from 'prop-types'

export const ResultItem = (props) => {
    const { votesCount, option, vote } = props
    const votes = option.votes.length

    const borderColor = vote ? cyan[900] : grey[400]
    const bg = vote ? cyan[50] : grey[100]
    const color = vote ? cyan[900] : grey[900]
    const percentage = Number(((votes / votesCount) * 100).toFixed(1))
    /* */

    return <Grid item>
        <Card variant='outline' sx={{ border: 1, borderColor: borderColor, py: 1, px: 1.5, backgroundColor: bg, color: color }}>

            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                {option.text} {vote && <Chip label="Your Choice" size="small" sx={{ float: 'right' }} />}
            </Typography>
            <Grid container sx={{ alignItems: 'center', textAlign: 'center' }}>
                <Grid xs item>
                    <LinearProgress variant='determinate' value={percentage} />
                </Grid>
                <Grid xs={2} item>
                    <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                        {`${percentage}%`}
                    </Typography>
                </Grid>
            </Grid>
            <Typography sx={{ fontWeight: 'bold', fontSize: '0.75em', textAlign: 'center', mt: 0.5 }}>
                {`${votes} out of ${votesCount} votes`}
            </Typography>
        </Card>
    </Grid >
}

ResultItem.propTypes = {
    option: PropTypes.object.isRequired,
    votesCount: PropTypes.number.isRequired,
    vote: PropTypes.bool.isRequired
}

export default ResultItem
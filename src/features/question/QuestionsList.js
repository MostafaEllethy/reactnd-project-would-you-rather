import { Grid } from '@mui/material'

import QuestionListItem from './QuestionListItem'

const QuestionsList = ({ questions }) => {
    return (
        <Grid container direction='column' rowSpacing={1.5}>
            {questions.map(question => (
                <QuestionListItem key={question.id} question={question} />
            ))}
        </Grid>
    )
}

export default QuestionsList
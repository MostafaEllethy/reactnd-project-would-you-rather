import { useSelector } from "react-redux"
import {selectAnsweredQuestions} from './questionSlice'

const AnsweredQuestions = () => {
    const answeredQuestions = useSelector(selectAnsweredQuestions)
    console.log(answeredQuestions)
    return (
        <div>
            Answered Questions
        </div>
    )
}

export default AnsweredQuestions
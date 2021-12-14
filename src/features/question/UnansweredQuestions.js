import { useSelector } from "react-redux"
import {selectUnansweredQuestions} from './questionSlice'

const UnansweredQuestions = () => {
    const unansweredQuestions = useSelector(selectUnansweredQuestions)
    console.log(unansweredQuestions)
    return (
        <div>
            Unanswered Questions
        </div>
    )
}

export default UnansweredQuestions
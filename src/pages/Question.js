import { useParams } from "react-router-dom"

const Question = () => {
    const { question_id } = useParams()
    return <div>{question_id}</div>
}

export default Question
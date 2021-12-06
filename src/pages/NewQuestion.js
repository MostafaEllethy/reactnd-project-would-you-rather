import { useAuth } from '../features/auth'

const NewQuestion = () => {
    const auth = useAuth();
    console.log("NQ", auth)
    return <div>New Question</div>
}

export default NewQuestion
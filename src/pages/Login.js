import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from '../features/auth'

const Login = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    return <button onClick={() => { auth.signin(); navigate(from, { replace: true }) }}>Login</button>
}

export default Login
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from '../features/auth'
import { selectStatus } from '../features/user/userSlice'

const Login = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const status = useSelector(selectStatus)
    //useEffect(() => dispatch(fetchUsers()), [dispatch])
    return <button onClick={() => { auth.signin(); navigate(from, { replace: true }) }}>Login {status ? 'Loading' : 'Ok'}</button>
}

export default Login
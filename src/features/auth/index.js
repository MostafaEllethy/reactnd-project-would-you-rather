import { createContext, useContext, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { LOGIN } from '../../routes'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    let [user, setUser] = useState(null)

    const signin = (user) => { setUser(user) }
    const signout = () => { setUser(null) }

    const value = { user, signin, signout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const RequireAuth = ({ children }) => {
    const auth = useAuth()
    const location = useLocation()
    return auth.user === null ? <Navigate to={LOGIN} state={{ from: location }} /> : children
}


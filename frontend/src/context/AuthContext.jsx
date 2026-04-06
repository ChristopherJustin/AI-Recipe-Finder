import { createContext, useContext, useEffect, useState } from "react"
import { fetchMe } from "../api/authApi"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedAccess = localStorage.getItem("access_token")
        const storedRefresh = localStorage.getItem("refresh_token")

        if (storedAccess) setAccessToken(storedAccess)
        if (storedRefresh) setRefreshToken(storedRefresh)

        const init = async () => {
            if (!storedAccess) {
                setLoading(false)
                return
            }

            try {
                const me = await fetchMe()
                setUser(me)
            } catch {
                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")
                setAccessToken(null)
                setRefreshToken(null)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        init()
    }, [])

    const login = ({ access_token, refresh_token, user }) => {
        localStorage.setItem("access_token", access_token)
        localStorage.setItem("refresh_token", refresh_token)
        setAccessToken(access_token)
        setRefreshToken(refresh_token)
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        setAccessToken(null)
        setRefreshToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                user,
                login,
                logout,
                isAuthenticated: !!accessToken,
                setAccessToken,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
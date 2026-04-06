import api from "./apiClient"

export const loginUser = async (data) => {
    const res = await api.post("/auth/login", data)
    return res.data
}

export const registerUser = async (data) => {
    const res = await api.post("/auth/register", data)
    return res.data
}

export const refreshAccessToken = async (refreshToken) => {
    const res = await api.post("/auth/refresh", {
        refresh_token: refreshToken,
    })
    return res.data
}

export const fetchMe = async () => {
    const res = await api.get("/auth/me")
    return res.data
}
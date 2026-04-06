import api from "./apiClient"

export const fetchProfile = async () => {
    const res = await api.get("/auth/me")
    return res.data
}

export const updateProfile = async (data) => {
    const res = await api.put("/auth/me", data)
    return res.data
}

export const changePassword = async (data) => {
    const res = await api.put("/auth/change-password", data)
    return res.data
}
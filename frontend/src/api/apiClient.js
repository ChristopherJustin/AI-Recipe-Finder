import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
})

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("access_token")

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve(token)
        }
    })
    failedQueue = []
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/login") &&
            !originalRequest.url.includes("/auth/register") &&
            !originalRequest.url.includes("/auth/refresh")
        ) {
            originalRequest._retry = true

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return api(originalRequest)
                })
            }

            isRefreshing = true

            try {
                const refreshToken = localStorage.getItem("refresh_token")

                if (!refreshToken) {
                    throw error
                }

                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"}/auth/refresh`,
                    { refresh_token: refreshToken }
                )

                const newAccessToken = response.data.access_token

                localStorage.setItem("access_token", newAccessToken)
                processQueue(null, newAccessToken)

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return api(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError, null)
                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")
                window.location.href = "/login"
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export default api
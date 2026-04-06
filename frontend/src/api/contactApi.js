import api from "./apiClient"

export const sendContactMessage = async (formData) => {
    const res = await api.post("/contact", formData)
    return res.data
}
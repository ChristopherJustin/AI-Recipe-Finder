import api from "./apiClient"

export const generateMealPlan = async (days) => {
    const res = await api.post(`/meal-plan?days=${days}`)
    return res.data
}
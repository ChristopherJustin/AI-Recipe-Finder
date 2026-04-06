import api from "./apiClient"

export const getPantry = async () => {
    const res = await api.get("/pantry")
    return res.data
}

export const addPantryItem = async (item) => {
    const res = await api.post("/pantry", item)
    return res.data
}

export const deletePantryItem = async (id) => {
    const res = await api.delete(`/pantry/${id}`)
    return res.data
}
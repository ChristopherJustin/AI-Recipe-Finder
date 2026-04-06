import api from "./apiClient"

export const searchRecipes = async (ingredients) => {
    const res = await api.post("/recipes/search", { ingredients })
    return res.data
}

export const generateRecipes = async (ingredients) => {
    const res = await api.post("/ai/generate-recipes", { ingredients })
    return res.data
}

export const detectIngredients = async (image) => {
    const formData = new FormData()
    formData.append("image", image)

    const res = await api.post(
        "/vision/search-from-image",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )

    return res.data
}

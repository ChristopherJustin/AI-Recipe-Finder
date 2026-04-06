import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../api/apiClient"

export default function useSaveRecipe() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (recipe) => {
            const res = await api.post("/saved/save", {
                recipe_id: recipe.id,
                recipe_name: recipe.name,
            })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["savedRecipes"] })
        },
    })
}
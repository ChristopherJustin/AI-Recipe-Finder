import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../api/apiClient"

export default function useDeleteSavedRecipe() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id) => {
            await api.delete(`/saved/delete/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["savedRecipes"] })
        },
    })
}
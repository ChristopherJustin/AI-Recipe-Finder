import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getPantry, addPantryItem, deletePantryItem } from "../api/pantryApi"

export function usePantry() {
    return useQuery({
        queryKey: ["pantry"],
        queryFn: getPantry,
    })
}

export function useAddPantryItem() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addPantryItem,
        onSuccess: () => {
            queryClient.invalidateQueries(["pantry"])
        },
    })
}

export function useDeletePantryItem() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deletePantryItem,
        onSuccess: () => {
            queryClient.invalidateQueries(["pantry"])
        },
    })
}
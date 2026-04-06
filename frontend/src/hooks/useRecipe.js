import { useQuery } from "@tanstack/react-query"
import api from "../api/apiClient"

const fetchRecipe = async (id) => {
    const res = await api.get(`/recipes/${id}`)
    return res.data
}

export default function useRecipe(id) {

    return useQuery({
        queryKey: ["recipe", id],
        queryFn: () => fetchRecipe(id),
        enabled: !!id,
    })

}
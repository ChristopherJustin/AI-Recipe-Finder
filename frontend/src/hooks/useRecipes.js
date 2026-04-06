import { useQuery } from "@tanstack/react-query"
import api from "../api/apiClient"

const fetchRecipes = async () => {
    const res = await api.get("/recipes/all")
    return res.data
}

export default function useRecipes() {

    return useQuery({
        queryKey: ["recipes"],
        queryFn: fetchRecipes,
        staleTime: 1000 * 60 * 5,
    })

}
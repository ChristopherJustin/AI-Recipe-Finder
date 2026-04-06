import { useQuery } from "@tanstack/react-query"
import api from "../api/apiClient"
import useAuth from "./useAuth"

export default function useSavedRecipes() {
    const { isAuthenticated } = useAuth()

    return useQuery({
        queryKey: ["savedRecipes"],
        queryFn: async () => {
            const res = await api.get("/saved/")
            return res.data.recipes || []
        },
        enabled: isAuthenticated,
        retry: false,
    })
}
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchProfile, updateProfile, changePassword } from "../api/profileApi"

export function useProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfile,
    })
}

export function useUpdateProfile() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] })
        },
    })
}

export function useChangePassword() {
    return useMutation({
        mutationFn: changePassword,
    })
}
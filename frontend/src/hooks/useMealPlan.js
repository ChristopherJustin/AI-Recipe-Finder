import { useMutation } from "@tanstack/react-query"
import { generateMealPlan } from "../api/mealPlannerApi"

export default function useMealPlan() {
    return useMutation({
        mutationFn: generateMealPlan,
    })
}
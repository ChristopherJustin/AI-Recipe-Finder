import useSavedRecipes from "./useSavedRecipes"
import useSaveRecipe from "./useSaveRecipe"
import useDeleteSavedRecipe from "./useDeleteSavedRecipe"

export default function useRecipeSaveActions() {
    const { data: savedRecipes = [] } = useSavedRecipes()
    const saveRecipe = useSaveRecipe()
    const deleteSavedRecipe = useDeleteSavedRecipe()

    const isSaved = (recipe) =>
        savedRecipes.some((r) => r.name === recipe.name)

    const toggleSave = (recipe) => {
        if (isSaved(recipe)) {
            const saved = savedRecipes.find((r) => r.name === recipe.name)

            if (saved) {
                deleteSavedRecipe.mutate(saved.id)
            }
        } else {
            saveRecipe.mutate(recipe)
        }
    }

    return {
        savedRecipes,
        isSaved,
        toggleSave,
        isSavingRecipe: saveRecipe.isPending,
        isDeletingRecipe: deleteSavedRecipe.isPending,
    }
}
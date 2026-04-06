import { Link } from "react-router-dom"
import { Heart } from "lucide-react"

export default function RecipeResults({
    recipeResults = [],
    savedRecipes = [],
    onToggleSave,
}) {
    if (!recipeResults.length) return null

    const isSaved = (recipe) =>
        savedRecipes.some((r) => r.name === recipe.name)

    return (
        <div className="pt-4 border-t border-white/10 space-y-3">
            <p className="text-sm text-gray-100">Recipes</p>

            {recipeResults.map((recipe) => {
                const ingredients = recipe.ingredients || []
                const missingIngredients = recipe.missing_ingredients || []

                return (
                    <div
                        key={recipe.id || recipe.name}
                        className="flex items-start justify-between gap-4 rounded-xl bg-black/10 p-4 hover:bg-white/20 transition"
                    >
                        <Link
                            to={`/recipe/${recipe.id}`}
                            className="flex-1 min-w-0"
                        >
                            <p className="font-medium text-lg text-white">
                                {recipe.name}
                            </p>

                            {ingredients.length > 0 && (
                                <p className="text-sm text-gray-200 mt-2 leading-6">
                                    <span className="font-medium text-white">
                                        Ingredients:
                                    </span>{" "}
                                    {ingredients.join(", ")}
                                </p>
                            )}

                            {missingIngredients.length > 0 && (
                                <p className="text-sm text-red-300 mt-2 leading-6">
                                    <span className="font-medium text-white">
                                        Missing:
                                    </span>{" "}
                                    {missingIngredients.join(", ")}
                                </p>
                            )}
                        </Link>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                if (onToggleSave) onToggleSave(recipe)
                            }}
                            className="shrink-0 mt-1 p-2 rounded-full hover:bg-black/20 transition"
                            aria-label="Save recipe"
                        >
                            <Heart
                                className={`w-6 h-6 transition ${isSaved(recipe)
                                        ? "fill-red-500 text-red-500 hover:text-red-600 hover:fill-red-600"
                                        : "text-white"
                                    }`}
                            />
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
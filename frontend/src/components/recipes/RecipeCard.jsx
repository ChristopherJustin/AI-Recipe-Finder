import { Link } from "react-router-dom"
import { Heart } from "lucide-react"

export default function RecipeCard({
    recipe,
    isSaved,
    onToggleSave,
}) {

    return (
        <div className="flex items-center justify-between gap-4 rounded-xl bg-black/10 p-4 hover:bg-white/10 transition">

            <Link
                to={`/recipe/${recipe.id}`}
                className="flex-1"
            >
                <p className="text-lg font-medium">
                    {recipe.name}
                </p>

                <p className="text-sm text-gray-300 mt-1">
                    Ingredients: {recipe.ingredients.join(", ")}
                </p>
            </Link>

            <button
                onClick={() => onToggleSave(recipe)}
                className="p-2 rounded-full hover:bg-black/20 transition"
                aria-label="Save recipe"
            >
                <Heart
                    className={`w-6 h-6 transition ${isSaved
                            ? "fill-red-500 text-red-500 hover:text-red-600 hover:fill-red-600"
                            : "text-white"
                        }`}
                />
            </button>

        </div>
    )
}
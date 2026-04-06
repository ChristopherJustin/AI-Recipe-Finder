import { useParams, useNavigate } from "react-router-dom"
import { Heart } from "lucide-react"

import useRecipe from "../hooks/useRecipe"
import useRecipeSaveActions from "../hooks/useRecipeSaveActions"
import useAuth from "../hooks/useAuth"

export default function RecipeDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: recipe, isLoading } = useRecipe(id)
    const { isSaved, toggleSave } = useRecipeSaveActions()
    const { isAuthenticated } = useAuth()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading recipe…
            </div>
        )
    }

    if (!recipe) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Recipe not found.
            </div>
        )
    }

    const saved = isSaved(recipe)

    return (
        <div className="min-h-screen bg-purple text-white">
            <section className="pt-24 pb-40 flex justify-center px-6">
                <div className="w-full max-w-4xl rounded-3xl bg-zinc-900/30 backdrop-blur-xl shadow-2xl p-10 space-y-10">
                    <button
                        onClick={() => {
                            if (window.history.length > 1) {
                                navigate(-1)
                            } else {
                                navigate("/")
                            }
                        }}
                        className="inline-block text-sm text-gray-300 hover:text-white transition"
                    >
                        ← Back
                    </button>

                    <h1 className="text-6xl font-bold text-center">
                        {recipe.name}
                    </h1>

                    <div className="flex justify-center">
                        {isAuthenticated ? (
                            <button
                                onClick={() => toggleSave(recipe)}
                                className="flex items-center gap-3 px-6 py-2 rounded-xl bg-black/10 hover:bg-white/20 transition"
                            >
                                <span className="font-medium text-gray-200">
                                    {saved ? "Saved" : "Save Recipe"}
                                </span>

                                <Heart
                                    className={`w-6 h-6 transition ${saved
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-200"
                                        }`}
                                />
                            </button>
                        ) : (
                            <p className="text-gray-200 text-sm">
                                Log in to save this recipe.
                            </p>
                        )}
                    </div>

                    <hr className="border-white/10" />

                    <div>
                        <h2 className="text-xl font-semibold mb-3">
                            Ingredients
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {(recipe.ingredients || []).map((ingredient, index) => (
                                <span
                                    key={`${ingredient}-${index}`}
                                    className="px-3 py-1 rounded-full bg-black/10 text-sm text-gray-200"
                                >
                                    {ingredient}
                                </span>
                            ))}
                        </div>
                    </div>

                    {recipe.instructions && recipe.instructions.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-3">
                                Instructions
                            </h2>

                            <ol className="space-y-3 list-decimal list-inside text-gray-200">
                                {Array.isArray(recipe.instructions)
                                    ? recipe.instructions.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))
                                    : recipe.instructions
                                        .split("\n")
                                        .map((step, index) => (
                                            <li key={index}>{step}</li>
                                        ))}
                            </ol>
                        </div>
                    )}

                    <div className="h-6" />
                </div>
            </section>
        </div>
    )
}


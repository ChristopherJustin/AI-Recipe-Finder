import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Heart } from "lucide-react"
import useRecipeSaveActions from "../../hooks/useRecipeSaveActions"

export default function AIResults({ aiResults = [] }) {
    const [expandedIndex, setExpandedIndex] = useState(null)
    const navigate = useNavigate()
    const { isSaved, toggleSave } = useRecipeSaveActions()

    if (aiResults.length === 0) return null

    return (
        <div className="pt-4 border-t border-white/10 space-y-3">
            <p className="text-sm text-gray-100">
                AI Generated Recipes
            </p>

            {aiResults.map((recipe, idx) => {
                const isExpanded = expandedIndex === idx
                const saved = recipe.id ? isSaved(recipe) : false

                return (
                    <div
                        key={idx}
                        className="bg-black/10 p-4 rounded-xl hover:bg-white/20 transition"
                    >
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/ai-recipe", {
                                    state: { recipe },
                                })
                            }
                            className="w-full text-left"
                        >
                            <p className="font-medium text-lg text-white">
                                {recipe.name}
                            </p>

                            {recipe.ingredients?.length > 0 && (
                                <p className="text-sm text-gray-200 mt-2">
                                    <span className="font-medium text-white">
                                        Ingredients:
                                    </span>{" "}
                                    {recipe.ingredients.join(", ")}
                                </p>
                            )}
                        </button>

                        <div className="mt-3 flex items-center justify-between">
                            {recipe.instructions?.length > 0 ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setExpandedIndex(isExpanded ? null : idx)
                                    }
                                    className="text-sm text-gray-300 hover:text-white transition"
                                >
                                    {isExpanded ? "Hide Instructions" : "Preview Instructions"}
                                </button>
                            ) : (
                                <div />
                            )}

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (recipe.id) {
                                        toggleSave(recipe)
                                    }
                                }}
                                className="p-2 rounded-full hover:bg-black/20 transition"
                                aria-label="Save AI recipe"
                                disabled={!recipe.id}
                            >
                                <Heart
                                    className={`w-6 h-6 transition ${saved
                                            ? "fill-red-500 text-red-500 hover:text-red-600 hover:fill-red-600"
                                            : "text-white"
                                        } ${!recipe.id ? "opacity-50" : ""}`}
                                />
                            </button>
                        </div>

                        {isExpanded && recipe.instructions?.length > 0 && (
                            <ol className="mt-3 space-y-1 text-sm text-gray-200 list-decimal list-inside">
                                {recipe.instructions.map((step, i) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ol>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
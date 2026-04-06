import React, { useMemo, useState } from "react"
import { Link } from "react-router-dom"

import useSavedRecipes from "../hooks/useSavedRecipes"
import useDeleteSavedRecipe from "../hooks/useDeleteSavedRecipe"
import useAuth from "../hooks/useAuth"

export default function SavedRecipes() {
    const [sortOrder, setSortOrder] = useState("newest")

    const { isAuthenticated } = useAuth()
    const { data: savedRecipes = [], isLoading, isError } = useSavedRecipes()
    const deleteSavedRecipe = useDeleteSavedRecipe()

    const recipes = useMemo(() => {
        return [...savedRecipes].sort((a, b) =>
            sortOrder === "newest" ? b.id - a.id : a.id - b.id
        )
    }, [savedRecipes, sortOrder])

    const error = !isAuthenticated
        ? "Please log in to view saved recipes."
        : isError
            ? "Failed to load saved recipes."
            : ""

    const deleteRecipe = (id) => {
        deleteSavedRecipe.mutate(id)
    }

    return (
        <div className="min-h-screen bg-purple text-white">
            <section className="pt-24 pb-40 relative min-h-screen flex flex-col items-center px-6">
                <div className="w-full max-w-5xl rounded-3xl bg-zinc-900/30 backdrop-blur-xl shadow-2xl p-8 space-y-6">
                    <h1 className="text-4xl font-bold text-center">
                        My Saved Recipes
                    </h1>

                    <p className="text-sm text-gray-200 text-center">
                        {recipes.length === 1
                            ? "1 saved recipe"
                            : `${recipes.length} saved recipes`}
                    </p>

                    <div className="flex justify-center">
                        <button
                            onClick={() =>
                                setSortOrder((prev) =>
                                    prev === "newest" ? "oldest" : "newest"
                                )
                            }
                            className="cursor-pointer text-black text-sm px-4 py-2 rounded-lg bg-white hover:bg-gray-200 transition"
                        >
                            {sortOrder === "newest"
                                ? "Newest → Oldest"
                                : "Oldest → Newest"}
                        </button>
                    </div>

                    {sortOrder === "newest" ? (
                        <p className="text-xs text-gray-200 text-center">
                            Sorted by recently saved
                        </p>
                    ) : (
                        <p className="text-xs text-gray-200 text-center">
                            Sorted by oldest saved
                        </p>
                    )}

                    {error && (
                        <p className="text-red-400 text-sm text-center">
                            {error}
                        </p>
                    )}

                    {isLoading && isAuthenticated && (
                        <p className="text-gray-200 text-center">
                            Loading saved recipes...
                        </p>
                    )}

                    <div className="space-y-3">
                        {!isLoading && recipes.length === 0 && !error ? (
                            <p className="text-gray-400 text-center">
                                No saved recipes yet.
                            </p>
                        ) : (
                            recipes.map((recipe) => (
                                <div
                                    key={recipe.id}
                                    className="flex items-center justify-between gap-4 rounded-xl bg-black/10 p-4 hover:bg-white/20 transition"
                                >
                                    <Link
                                        to={`/recipe/${recipe.recipe_id}`}
                                        className="text-lg font-medium"
                                    >
                                        {recipe.name}
                                    </Link>

                                    <button
                                        onClick={() => deleteRecipe(recipe.id)}
                                        className="text-sm px-3 py-1 rounded-lg bg-red-500/30 text-red-300 hover:bg-red-600/70 transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="h-6" />
                </div>
            </section>
        </div>
    )
}


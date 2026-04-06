import { useState } from "react"

import useRecipes from "../hooks/useRecipes"
import useRecipeSaveActions from "../hooks/useRecipeSaveActions"

import RecipeCard from "../components/recipes/RecipeCard"
import RecipeSearchBar from "../components/recipes/RecipeSearchBar"
import RecipePagination from "../components/recipes/RecipePagination"

import { filterRecipes } from "../utils/filterRecipes"

const RECIPES_PER_PAGE = 8

export default function BrowseRecipes() {
    const { data: recipes = [], isLoading } = useRecipes()
    const { isSaved, toggleSave } = useRecipeSaveActions()

    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading recipes...
            </div>
        )
    }

    const filteredRecipes = filterRecipes(recipes, searchTerm)

    const totalPages = Math.ceil(
        filteredRecipes.length / RECIPES_PER_PAGE
    )

    const startIndex = (currentPage - 1) * RECIPES_PER_PAGE

    const paginatedRecipes = filteredRecipes.slice(
        startIndex,
        startIndex + RECIPES_PER_PAGE
    )

    return (
        <div className="min-h-screen bg-purple text-white">
            <section className="pt-24 pb-40 flex flex-col items-center px-6">
                <div className="w-full max-w-5xl rounded-3xl bg-zinc-900/30 backdrop-blur-xl shadow-2xl p-8 space-y-6">
                    <h1 className="text-4xl font-bold text-center">
                        Browse All Recipes
                    </h1>

                    <RecipeSearchBar
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1)
                        }}
                    />

                    <p className="text-sm text-gray-200 text-center">
                        Showing {filteredRecipes.length} recipes
                    </p>

                    <div className="space-y-3">
                        {paginatedRecipes.length === 0 ? (
                            <p className="text-gray-200 text-center">
                                No recipes found.
                            </p>
                        ) : (
                            paginatedRecipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id || recipe.name}
                                    recipe={recipe}
                                    isSaved={isSaved(recipe)}
                                    onToggleSave={toggleSave}
                                    query={searchTerm}
                                />
                            ))
                        )}
                    </div>

                    <RecipePagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                    <div className="h-6" />
                </div>
            </section>
        </div>
    )
}
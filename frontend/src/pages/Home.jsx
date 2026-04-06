import useRecipeSearch from "../hooks/useRecipeSearch"
import useRecipeSaveActions from "../hooks/useRecipeSaveActions"

import ImageUpload from "../components/recipes/ImageUpload"
import IngredientTextarea from "../components/recipes/IngredientTextArea"
import IngredientEditor from "../components/recipes/IngredientEditor"
import RecipeResults from "../components/recipes/RecipeResults"
import AIResults from "../components/recipes/AIResults"
import ImageDetectionSummary from "../components/recipes/ImageDetectionSummary"
import { filterRecipes } from "../utils/filterRecipes"

export default function Home() {
    const {
        ingredients,
        setIngredients,

        recipeResults,
        aiResults,

        imageResults,
        imageConfidence,
        uncertainIngredients,
        editableIngredients,
        newIngredient,
        setNewIngredient,

        showEditor,

        isSearchingRecipes,
        isGeneratingAI,
        isDetectingImage,

        setImage,

        handleSearchRecipes,
        handleAiGenerate,
        confirmIngredientsAndSearch,
        confirmIngredientsAndGenerateAI,

        updateIngredient,
        removeIngredient,
        addIngredient,

        aiError,
        retryAiGenerate,

        resetImageFlow,
        clearSearch
    } = useRecipeSearch()

    const { savedRecipes, toggleSave } = useRecipeSaveActions()

    const filteredResults = filterRecipes(recipeResults, ingredients)

    return (
        <div className="min-h-screen bg-purple text-white">
            <section className="pt-24 pb-40 min-h-screen flex flex-col items-center justify-center px-6">
                <h1 className="text-5xl font-bold mb-6">
                    Make something delicious
                </h1>

                <div className="flex gap-4 mb-6 flex-wrap">
                    <ImageUpload onSelect={setImage} />

                    <button
                        onClick={handleAiGenerate}
                        className="rounded-full bg-white text-black px-5 py-2 text-sm hover:bg-gray-200"
                    >
                        ✨ AI Generate Recipe
                    </button>
                </div>

                <div className="w-full max-w-3xl rounded-3xl bg-zinc-900/30 p-6 space-y-6">
                    <IngredientTextarea
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                        resetImageFlow={resetImageFlow}
                        clearSearch={clearSearch}
                    />

                    <div className="flex justify-end">
                        <button
                            onClick={handleSearchRecipes}
                            className="cursor-pointer w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200"
                        >
                            ↑
                        </button>
                    </div>

                    {isDetectingImage && (
                        <p className="text-sm text-gray-100">
                            Analyzing image...
                        </p>
                    )}

                    {!isDetectingImage && isGeneratingAI && (
                        <p className="text-sm text-gray-100">
                            Generating AI recipes...
                        </p>
                    )}

                    {!isDetectingImage && !isGeneratingAI && isSearchingRecipes && (
                        <p className="text-sm text-gray-100">
                            Searching recipes...
                        </p>
                    )}

                    <ImageDetectionSummary
                        imageResults={imageResults}
                        imageConfidence={imageConfidence}
                        uncertainIngredients={uncertainIngredients}
                    />

                    {showEditor && (
                        <IngredientEditor
                            editableIngredients={editableIngredients}
                            updateIngredient={updateIngredient}
                            removeIngredient={removeIngredient}
                            addIngredient={addIngredient}
                            newIngredient={newIngredient}
                            setNewIngredient={setNewIngredient}
                            confirmIngredientsAndSearch={confirmIngredientsAndSearch}
                            confirmIngredientsAndGenerateAI={confirmIngredientsAndGenerateAI}
                        />
                    )}

                    <RecipeResults
                        recipeResults={filteredResults}
                        savedRecipes={savedRecipes}
                        onToggleSave={toggleSave}
                    />

                    {aiError && aiResults.length === 0 && (
                        <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 text-center space-y-3">
                            <p className="text-sm text-red-300">
                                {aiError}
                            </p>

                            <button
                                onClick={retryAiGenerate}
                                className="px-4 py-2 bg-white text-black rounded-lg text-sm hover:bg-gray-200 transition"
                            >
                                🔄 Try Again
                            </button>
                        </div>
                    )}

                    <AIResults aiResults={aiResults} />
                </div>
            </section>
        </div>
    )
}
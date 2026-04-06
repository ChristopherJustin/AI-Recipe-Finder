export default function IngredientEditor({
    editableIngredients,
    updateIngredient,
    removeIngredient,
    addIngredient,
    newIngredient,
    setNewIngredient,
    confirmIngredientsAndSearch,
    confirmIngredientsAndGenerateAI,
}) {
    return (
        <div className="border-t border-white/10 pt-4 space-y-3">
            <p className="text-sm text-gray-100">
                Review and edit detected ingredients
            </p>

            {editableIngredients.map((item, i) => (
                <div key={i} className="flex gap-2">
                    <input
                        value={item}
                        onChange={(e) => updateIngredient(i, e.target.value)}
                        className="flex-1 bg-black/30 rounded px-3 py-1"
                    />
                    <button
                        className="cursor-pointer"
                        onClick={() => removeIngredient(i)}
                        type="button"
                    >
                        ✕
                    </button>
                </div>
            ))}

            <div className="flex gap-2">
                <input
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Add ingredient"
                    className="flex-1 bg-black/30 rounded px-3 py-1"
                />
                <button
                    className="cursor-pointer"
                    onClick={addIngredient}
                    type="button"
                >
                    Add
                </button>
            </div>

            <div className="flex justify-center gap-3 pt-4 flex-wrap">
                <button
                    onClick={confirmIngredientsAndSearch}
                    className="cursor-pointer rounded-full bg-white text-black hover:bg-gray-200 px-6 py-2 text-sm font-medium"
                    type="button"
                >
                    Confirm & Find Recipes
                </button>

                <button
                    onClick={confirmIngredientsAndGenerateAI}
                    className="cursor-pointer rounded-full bg-black/20 text-white hover:bg-white/20 px-6 py-2 text-sm font-medium border border-white/10"
                    type="button"
                >
                    Confirm & AI Generate
                </button>
            </div>
        </div>
    )
}
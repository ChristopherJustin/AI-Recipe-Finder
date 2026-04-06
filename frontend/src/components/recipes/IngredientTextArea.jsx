export default function IngredientTextarea({
    ingredients,
    setIngredients,
    resetImageFlow,
    clearSearch,
}) {
    return (
        <div className="relative">
            <textarea
                rows={2}
                value={ingredients}
                onChange={(e) => {
                    resetImageFlow()
                    setIngredients(e.target.value)
                }}
                placeholder="Enter ingredients, recipes, or dishes..."
                className="w-full bg-transparent outline-none text-lg text-white placeholder-white/60"
            />

            {ingredients && (
                <button
                    onClick={clearSearch}
                    className="absolute right-2 top-2 text-white/60 hover:text-white transition-opacity"
                >
                    ✕
                </button>
            )}
        </div>
    )
}
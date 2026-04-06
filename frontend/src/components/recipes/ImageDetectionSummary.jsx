export default function ImageDetectionSummary({
    imageResults = [],
    imageConfidence = {},
    uncertainIngredients = [],
}) {
    if (imageResults.length === 0) return null

    return (
        <div className="rounded-2xl bg-black/10 border border-white/10 p-4 space-y-3">
            <div>
                <p className="text-sm font-medium text-white">
                    We found these ingredients
                </p>
                <p className="text-xs text-gray-300 mt-1">
                    Review them below before searching or generating recipes.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {imageResults.map((ingredient) => {
                    const confidence = imageConfidence[ingredient]

                    return (
                        <span
                            key={ingredient}
                            className="px-3 py-1 rounded-full bg-white/10 text-sm text-gray-100"
                        >
                            {ingredient}
                            {typeof confidence === "number" && (
                                <span className="ml-2 text-xs text-gray-300">
                                    {Math.round(confidence * 100)}%
                                </span>
                            )}
                        </span>
                    )
                })}
            </div>

            {uncertainIngredients.length > 0 && (
                <div>
                    <p className="text-xs font-medium text-yellow-300">
                        Uncertain detections
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                        {uncertainIngredients.join(", ")}
                    </p>
                </div>
            )}
        </div>
    )
}
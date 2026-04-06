import { useLocation, useNavigate } from "react-router-dom"

export default function AIRecipeDetail() {
    const location = useLocation()
    const navigate = useNavigate()

    const recipe = location.state?.recipe

    if (!recipe) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-purple">
                AI recipe not found.
            </div>
        )
    }

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

                    <h1 className="text-5xl font-bold text-center">
                        {recipe.name}
                    </h1>

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

                    {recipe.instructions?.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-3">
                                Instructions
                            </h2>

                            <ol className="space-y-3 list-decimal list-inside text-gray-200">
                                {recipe.instructions.map((step, index) => (
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
function similarity(a = "", b = "") {
    if (!a || !b) return 0

    a = a.toLowerCase()
    b = b.toLowerCase()

    if (a === b) return 1
    if (a.includes(b) || b.includes(a)) return 0.85

    let matches = 0
    const shorter = a.length < b.length ? a : b
    const longer = a.length < b.length ? b : a

    for (const char of shorter) {
        if (longer.includes(char)) matches++
    }

    return matches / longer.length
}

export function filterRecipes(recipes = [], searchTerm = "") {
    const term = searchTerm.toLowerCase().trim()

    if (!term) return recipes

    const searchTerms = term.split(/[\s,]+/).filter(Boolean)

    return recipes
        .map((recipe) => {
            let score = 0

            const name = recipe.name?.toLowerCase() || ""
            const ingredients = recipe.ingredients || []

            if (name === term) score += 10 // exact match
            if (name.startsWith(term)) score += 3

            if (name.includes(term)) {
                score += 5
            } else if (similarity(name, term) >= 0.72) {
                score += 3
            }

            searchTerms.forEach((t) => {
                if (
                    ingredients.some((ri) =>
                        ri.toLowerCase().includes(t)
                    )
                ) {
                    score += 2
                } else if (
                    ingredients.some((ri) =>
                        similarity(ri, t) >= 0.72
                    )
                ) {
                    score += 1
                }
            })

            return { ...recipe, score }
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
}
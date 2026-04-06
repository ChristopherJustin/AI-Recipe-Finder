export default function RecipeList({ recipes }) {
    if (!recipes) return null;

    const { exact_matches, partial_matches } = recipes;

    return (
        <div>
            <h3>Exact Matches</h3>
            {exact_matches.length === 0 ? (
                <p>No exact matches found.</p>
            ) : (
                <ul>
                    {exact_matches.map((r) => (
                        <li key={r.id}>
                            {r.name} – Ingredients: {r.ingredients.join(", ")}
                        </li>
                    ))}
                </ul>
            )}

            <h3>Partial Matches</h3>
            {partial_matches.length === 0 ? (
                <p>No partial matches found.</p>
            ) : (
                <ul>
                    {partial_matches.map((r) => (
                        <li key={r.id}>
                            {r.name} – Missing: {r.missing_ingredients.join(", ")} (
                            {r.match_percentage}% match)
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

import { useState } from "react";

export default function IngredientInput({ onSearch }) {
    const [ingredientsText, setIngredientsText] = useState("");

    const handleSearch = () => {
        const ingredients = ingredientsText
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean);
        onSearch(ingredients);
    };

    return (
        <div>
            <h2>Enter Ingredients</h2>
            <input
                type="text"
                placeholder="e.g. eggs, milk, cheese"
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
            />
            <button onClick={handleSearch}>Search Recipes</button>
        </div>
    );
}

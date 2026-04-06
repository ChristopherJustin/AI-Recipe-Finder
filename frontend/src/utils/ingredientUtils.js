export const parseIngredients = (value) =>
    value
        .split(/[\s,]+/)
        .map((i) => i.trim())
        .filter(Boolean)
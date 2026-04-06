import { useState, useEffect } from "react"
import {
    searchRecipes,
    generateRecipes,
    detectIngredients
} from "../api/recipesApi"
import { parseIngredients } from "../utils/ingredientUtils"

export default function useRecipeSearch() {
    const [ingredients, setIngredients] = useState("")
    const [recipeResults, setRecipeResults] = useState([])
    const [aiResults, setAiResults] = useState([])

    const [image, setImage] = useState(null)
    const [imageResults, setImageResults] = useState([])
    const [imageConfidence, setImageConfidence] = useState({})
    const [uncertainIngredients, setUncertainIngredients] = useState([])

    const [editableIngredients, setEditableIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState("")
    const [showEditor, setShowEditor] = useState(false)

    const [isSearchingRecipes, setIsSearchingRecipes] = useState(false)
    const [isGeneratingAI, setIsGeneratingAI] = useState(false)
    const [isDetectingImage, setIsDetectingImage] = useState(false)

    const [aiError, setAiError] = useState("")

    useEffect(() => {
        if (image) handleImageUpload()
    }, [image])

    const resetImageFlow = () => {
        setImage(null)
        setImageResults([])
        setImageConfidence({})
        setUncertainIngredients([])
        setEditableIngredients([])
        setShowEditor(false)
    }

    const clearSearch = () => {
        setIngredients("")
        setRecipeResults([])
        setAiResults([])
        setImage(null)
        setImageResults([])
        setImageConfidence({})
        setUncertainIngredients([])
        setEditableIngredients([])
        setNewIngredient("")
        setShowEditor(false)
        setIsSearchingRecipes(false)
        setIsGeneratingAI(false)
        setIsDetectingImage(false)
    }

    const handleSearchRecipes = async () => {
        if (!ingredients.trim()) return

        const parsed = parseIngredients(ingredients)

        setIsSearchingRecipes(true)
        setAiResults([])

        try {
            const res = await searchRecipes(parsed)

            setRecipeResults([
                ...(res.exact_matches || []),
                ...(res.partial_matches || []),
            ])
        } catch {
            alert("Error searching recipes")
        } finally {
            setIsSearchingRecipes(false)
        }
    }

    const handleAiGenerate = async () => {
        if (!ingredients.trim()) return

        const parsed = parseIngredients(ingredients)

        setIsGeneratingAI(true)
        setRecipeResults([])
        setAiResults([])
        setAiError("")

        try {
            const res = await generateRecipes(parsed)
            const recipes = Array.isArray(res?.recipes) ? res.recipes : []

            if (recipes.length === 0) {
                setAiError("AI failed to generate recipes. Try again.")
            }

            setAiResults(recipes)
        } catch {
            setAiError("AI request failed. Please try again.")
            setAiResults([])
        } finally {
            setIsGeneratingAI(false)
        }
    }

    const retryAiGenerate = () => {
        handleAiGenerate()
    }

    const handleImageUpload = async () => {
        if (!image) return

        setIsDetectingImage(true)
        setRecipeResults([])
        setAiResults([])

        try {
            const visionRes = await detectIngredients(image)

            const detected = visionRes.ingredients || []

            setImageResults(detected)
            setImageConfidence(visionRes.confidence || {})
            setUncertainIngredients(visionRes.uncertain || [])
            setEditableIngredients(detected)
            setIngredients(detected.join(", "))
            setShowEditor(true)

            if (detected.length > 0) {
                setIsGeneratingAI(true)
                setAiError("")

                try {
                    const aiRes = await generateRecipes(detected)

                    const recipes = Array.isArray(aiRes?.recipes)
                        ? aiRes.recipes
                        : []

                    if (recipes.length === 0) {
                        setAiError("AI failed to generate recipes. Try again.")
                    }

                    setAiResults(recipes)
                } finally {
                    setIsGeneratingAI(false)
                }
            }
        } catch {
            alert("Error detecting ingredients")
        } finally {
            setIsDetectingImage(false)
        }
    }

    const updateIngredient = (index, value) => {
        const updated = [...editableIngredients]
        updated[index] = value
        setEditableIngredients(updated)
    }

    const removeIngredient = (index) => {
        setEditableIngredients(editableIngredients.filter((_, i) => i !== index))
    }

    const addIngredient = () => {
        if (!newIngredient.trim()) return

        setEditableIngredients([...editableIngredients, newIngredient.trim()])
        setNewIngredient("")
    }

    const confirmIngredientsAndSearch = async () => {
        if (editableIngredients.length === 0) return

        setIsSearchingRecipes(true)
        setShowEditor(false)
        setIngredients(editableIngredients.join(", "))

        try {
            const res = await searchRecipes(editableIngredients)

            setRecipeResults([
                ...(res.exact_matches || []),
                ...(res.partial_matches || []),
            ])

            setAiResults([])
        } catch {
            alert("Error searching recipes")
        } finally {
            setIsSearchingRecipes(false)
        }
    }

    const confirmIngredientsAndGenerateAI = async () => {
        if (editableIngredients.length === 0) return

        setIsGeneratingAI(true)
        setShowEditor(false)
        setIngredients(editableIngredients.join(", "))
        setAiError("")

        try {
            const res = await generateRecipes(editableIngredients)
            const recipes = Array.isArray(res?.recipes) ? res.recipes : []

            if (recipes.length === 0) {
                setAiError("AI failed to generate recipes. Try again.")
            }

            setAiResults(recipes)
            setRecipeResults([])
        } catch {
            setAiError("AI request failed. Please try again.")
            setAiResults([])
        } finally {
            setIsGeneratingAI(false)
        }
    }

    return {
        ingredients,
        setIngredients,

        recipeResults,
        aiResults,

        image,
        setImage,
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
    }
}
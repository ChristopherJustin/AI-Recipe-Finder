import { usePantry, useAddPantryItem, useDeletePantryItem } from "../hooks/usePantry"
import { useState } from "react"

export default function Pantry() {
    const { data: pantry, isLoading } = usePantry()
    const addItem = useAddPantryItem()
    const deleteItem = useDeletePantryItem()

    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")

    const handleAdd = () => {
        addItem.mutate({ name, quantity })
        setName("")
        setQuantity("")
    }

    if (isLoading) return <p>Loading pantry...</p>

    return (
        <div>
            <h1>Your Pantry</h1>

            <input
                placeholder="Ingredient"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />

            <button onClick={handleAdd}>Add</button>

            <ul>
                {pantry?.map((item) => (
                    <li key={item.id}>
                        {item.name} ({item.quantity})
                        <button onClick={() => deleteItem.mutate(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
import useMealPlan from "../hooks/useMealPlan"
import { useState } from "react"

export default function MealPlanner() {
    const mealPlan = useMealPlan()
    const [days, setDays] = useState(5)

    const generate = () => {
        mealPlan.mutate(days)
    }

    return (
        <div>
            <h1>AI Meal Planner</h1>

            <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
            />

            <button onClick={generate}>Generate Plan</button>

            {mealPlan.data && (
                <div>
                    {mealPlan.data.plan.map((day) => (
                        <div key={day.day}>
                            <h3>Day {day.day}</h3>
                            <p>Breakfast: {day.breakfast}</p>
                            <p>Lunch: {day.lunch}</p>
                            <p>Dinner: {day.dinner}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
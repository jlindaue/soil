import React, { useState } from 'react';

type Recipe = {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sugar: number;
};

type MealPlan = {
    meals: Recipe[];
    totalCalories: number;
};

enum UserGoal {
    WeightLoss = "weight_loss",
    MuscleGain = "muscle_gain",
    HealthImprovement = "health_improvement"
}

const CalculatorPage: React.FC = () => {
    const [caloricGoal, setCaloricGoal] = useState<string>('');
    const [userGoal, setUserGoal] = useState<UserGoal>(UserGoal.HealthImprovement);
    const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
    const [error, setError] = useState<string>('');

    const recipes: Recipe[] = [
        { id: 1, name: "Grilled Chicken Salad", calories: 350, protein: 35, carbs: 15, fat: 10, sugar: 5 },
        { id: 2, name: "Vegan Bean Taco", calories: 250, protein: 10, carbs: 35, fat: 10, sugar: 2 },
        { id: 3, name: "Beef Stir Fry", calories: 400, protein: 25, carbs: 20, fat: 25, sugar: 4 },
        { id: 4, name: "Quinoa & Avocado Salad", calories: 300, protein: 8, carbs: 45, fat: 15, sugar: 3 },
        { id: 5, name: "Spinach Smoothie", calories: 180, protein: 5, carbs: 25, fat: 2, sugar: 18 },
        { id: 6, name: "Turkey Sandwich", calories: 330, protein: 30, carbs: 30, fat: 12, sugar: 4 },
        { id: 7, name: "Salmon with Veggies", calories: 500, protein: 45, carbs: 20, fat: 30, sugar: 4 },
        { id: 8, name: "Egg White Omelette", calories: 200, protein: 20, carbs: 5, fat: 10, sugar: 1 },
        { id: 9, name: "Eggs", calories: 140, protein: 12, carbs: 1, fat: 10, sugar: 1 },
        { id: 10, name: "Protein Oatmeal", calories: 250, protein: 15, carbs: 30, fat: 5, sugar: 4 },
        { id: 11, name: "Green Smoothie", calories: 150, protein: 4, carbs: 20, fat: 2, sugar: 18 }
       
    ];

    const handleCaloricGoalInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCaloricGoal(event.target.value);
        setError('');
    };

    const handleGoalSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUserGoal(event.target.value as UserGoal);
    };

    const generateMealPlan = () => {
        if (!caloricGoal || isNaN(Number(caloricGoal))) {
            setError('Please enter a valid caloric goal.');
            return;
        }

        const baseCalories = parseInt(caloricGoal, 10);
        let targetCalories = baseCalories * (userGoal === UserGoal.WeightLoss ? 0.8 : (userGoal === UserGoal.MuscleGain ? 1.2 : 1));
        let currentCalories = 0;
        let tempPlan: Recipe[] = [];
        let usedIds = new Set<number>();

        recipes.forEach(recipe => {
            if (currentCalories + recipe.calories <= targetCalories && !usedIds.has(recipe.id)) {
                tempPlan.push(recipe);
                currentCalories += recipe.calories;
                usedIds.add(recipe.id);
            }
        });

        setMealPlan({ meals: tempPlan, totalCalories: currentCalories });
        setError('');
    };

    return (
        <div className='page bg-white p-5' style={{ backgroundColor: '#FFF3B0', color: '#335C67' }}>
            <h1 className="text-2xl font-bold text-center mb-4" style={{ fontFamily: 'Pacifico, cursive' }}>Create Your Meal Plan</h1>
            <div className="mb-5">
                <label htmlFor="goal" className="block mb-2 text-sm font-medium">Select Your Goal:</label>
                <select
                    id="goal"
                    value={userGoal}
                    onChange={handleGoalSelection}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value={UserGoal.WeightLoss}>Weight Loss</option>
                    <option value={UserGoal.MuscleGain}>Muscle Gain</option>
                    <option value={UserGoal.HealthImprovement}>Overall Health</option>
                </select>
                
                <label htmlFor="calories" className="block mt-4 mb-2 text-sm font-medium">Maintenance Calories:</label>
                <input
                    type="number"
                    id="calories"
                    value={caloricGoal}
                    onChange={handleCaloricGoalInput}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your maintenance calories"
                />
                {error && <p className="text-red-500 mt-1">{error}</p>}
                <button
                    onClick={generateMealPlan}
                    className="mt-4 w-full p-2 text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
                >
                    Generate Plan
                </button>
            </div>
            {mealPlan && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold" style={{ fontFamily: 'Pacifico, cursive' }}>Your Personalized Meal Plan</h2>
                    <ul>
                        {mealPlan.meals.map((meal, index) => (
                            <li key={index} className="flex justify-between items-center rounded-lg p-3 my-2 bg-gray-100">
                                {meal.name} - {meal.calories} calories (Protein: {meal.protein}g, Carbs: {meal.carbs}g, Fat: {meal.fat}g, Sugar: {meal.sugar}g)
                            </li>
                        ))}
                    </ul>
                    <p>Total Calories: {mealPlan.totalCalories}</p>
                    <p>This plan is tailored to help you achieve your goal of {userGoal.toLowerCase().replace(/_/g, ' ')}. It's designed to help you {userGoal === UserGoal.WeightLoss ? 'reduce your body weight by creating a caloric deficit' : userGoal === UserGoal.MuscleGain ? 'increase muscle mass with a caloric surplus' : 'improve overall health by balancing your calorie intake'}.</p>
                </div>
            )}
        </div>
    );
};

export default CalculatorPage;
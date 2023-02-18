import React, { useState } from "react";

function MealPlannerForm({ recipe, closeModal, addToMealPlanner }) {
  const [selectedMeal, setSelectedMeal] = useState("breakfast");

  const handleSubmit = (event) => {
    event.preventDefault();
    addToMealPlanner(selectedMeal, recipe);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add to Meal Planner</h2>
      <label>
        <input
          type="radio"
          value="breakfast"
          checked={selectedMeal === "breakfast"}
          onChange={() => setSelectedMeal("breakfast")}
        />
        Breakfast
      </label>
      <label>
        <input
          type="radio"
          value="lunch"
          checked={selectedMeal === "lunch"}
          onChange={() => setSelectedMeal("lunch")}
        />
        Lunch
      </label>
      <label>
        <input
          type="radio"
          value="dinner"
          checked={selectedMeal === "dinner"}
          onChange={() => setSelectedMeal("dinner")}
        />
        Dinner
      </label>
      <button type="submit">Add to Meal Planner</button>
    </form>
  );
}

export default MealPlannerForm;
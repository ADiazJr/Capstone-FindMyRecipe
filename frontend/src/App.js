// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useNavigate }  from "react-router-dom";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchPage from "./pages/SearchPage/SearchPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";
import { useState } from "react";
import IngredientSearchPage from "./pages/IngredientSearchPage/IngredientSearchPage";
import RecipePage from "./pages/RecipePage/RecipePage";
import FavoriteRecipesPage from "./pages/FavoriteRecipesPage/FavoriteRecipesPage";
import ShoppingListPage from "./pages/ShoppingListPage/ShoppingListPage";
import MealPlannerPage from "./pages/MealPlannerPage/MealPlannerPage";

function App() {

  const [selectedRecipe, setSelectedRecipe] = useState({})
  const [recipes, setRecipes] = useState([])
  let navigate = useNavigate();

  async function getRecipes(search){
    let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=d7a4ab507bb8446f8adbe2de0d7cc7e6`)
    setRecipes(response.data.results)
    navigate('/search')
  }

  async function randomRecipes(){
    let response = await axios.get(`https://api.spoonacular.com/recipes/random?number=20&apiKey=d7a4ab507bb8446f8adbe2de0d7cc7e6`)
    setRecipes(response.data.recipes)
  }

  return (
    <div className="body">
      <Navbar getRecipes={getRecipes} />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorite_recipes"
          element={
            <PrivateRoute>
              <FavoriteRecipesPage setSelectedRecipe={setSelectedRecipe} />
            </PrivateRoute>
          }
        />
        <Route
          path="/shopping_list"
          element={
            <PrivateRoute>
              <ShoppingListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/meal_planner"
          element={
            <PrivateRoute>
              <MealPlannerPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/read/:recipeId" element={<RecipePage selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} />} />
        <Route path="/search" element={<SearchPage randomRecipes={randomRecipes} getRecipes={getRecipes} recipes={recipes} setSelectedRecipe={setSelectedRecipe} />} />
        <Route path="/ingredient_search" element={<IngredientSearchPage setSelectedRecipe={setSelectedRecipe} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

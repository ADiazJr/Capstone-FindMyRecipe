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

function App() {

  const [selectedRecipe, setSelectedRecipe] = useState({})
  const [recipes, setRecipes] = useState([])
  let navigate = useNavigate();

  async function getRecipes(search){
    let response = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${search}`, {
      headers: {
        "X-RapidAPI-Key": "1f1ce1238dmsh36abaf75fb5955cp1c20f7jsn99509f578ee6",
        "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      }
    })
    setRecipes(response.data.results)
    navigate('/search')
  }

  return (
    <div>
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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/read/:recipeId" element={<RecipePage selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} />} />
        <Route path="/search" element={<SearchPage recipes={recipes} setSelectedRecipe={setSelectedRecipe} />} />
        <Route path="/ingredient_search" element={<IngredientSearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

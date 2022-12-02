import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


const FavoriteRecipesPage = (props) => {

    const [recipeInfo, setRecipeInfo] = useState([])
    const [recipes, setRecipes] = useState([]);
    const [user, token] = useAuth();

    useEffect(() => {
        favoriteRecipes();
        changeIdToRecipe();
    }, [])

    async function favoriteRecipes(){
        let response = await axios.get(`http://127.0.0.1:8000/api/favorite_recipes/`, {
            headers: {
                Authorization: "Bearer " + token 
            }
        })
        setRecipes(response.data)
    }

    console.log("recipes", recipes)
    function changeIdToRecipe(){
        recipes.map(async (recipe) => {
            let response = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe.recipe_id}/information`, {
                headers: {
                    "X-RapidAPI-Key": "1f1ce1238dmsh36abaf75fb5955cp1c20f7jsn99509f578ee6",
                    "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                  }

                })
                if(recipeInfo.includes(recipe) === false){
                    setRecipeInfo([...recipeInfo, response.data])
                }
        })
    }

    console.log(recipeInfo)
    return (
        <div>
            {!user ?
            <p></p>:
            <div>
                {recipeInfo.map((recipe) => {
                    return(
                        <div>
                            <p>{recipe.title}</p>
                            <img src={recipe.image} alt="recipe" />
                            <p>Servings: {recipe.servings}</p>
                        </div>
                    )
                })}
            </div>
            }

        </div>
      );
}
 
export default FavoriteRecipesPage;
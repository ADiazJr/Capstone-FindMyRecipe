import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./FavoriteRecipesPage.css"
import { useNavigate } from "react-router-dom";


const FavoriteRecipesPage = (props) => {

    const [recipeInfo, setRecipeInfo] = useState([])
    const [recipes, setRecipes] = useState([]);
    const [user, token] = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        changeIdToRecipe();
    }, [recipes])

    useEffect(() =>{
       favoriteRecipes();
    }, [])
    

    async function favoriteRecipes(){
        let response = await axios.get(`http://127.0.0.1:8000/api/favorite_recipes/`, {
            headers: {
                Authorization: "Bearer " + token 
            }
        })
        setRecipes(response.data)
    }

    function changeIdToRecipe(){
        let favoriteRecipeDetails = []
        recipes.forEach(async (recipe) => {
            let response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.recipe_id}/information?apiKey=d7a4ab507bb8446f8adbe2de0d7cc7e6`)
                favoriteRecipeDetails.push(response.data)
        })
        setRecipeInfo(favoriteRecipeDetails)
    }

    function handleClick(event, recipe){
        event.preventDefault();
        props.setSelectedRecipe(recipe);
        navigate(`/read/${recipe.id}/`)

    }
    
    return (
        <div>
            {console.log('recipeInfo', recipeInfo)}
            {!user ?
            <p></p>:
            <div>
                <h3 className="header">Here's your Favorite Recipes {user.username}! </h3>
                <div className="row-recipe">
                    {recipeInfo.map((recipe) => {
                        return(
                            <div className="column">
                                <button className="recipe-button" onClick={(e) => handleClick(e, recipe)}>
                                    <p>{recipe.title}</p>
                                    <img className="recipe-image" src={recipe.image} alt="recipe" />
                                    <p>Servings: {recipe.servings}</p>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
            }

        </div>
      );
}
 
export default FavoriteRecipesPage;
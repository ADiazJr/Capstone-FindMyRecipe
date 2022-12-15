import { useEffect, useState } from "react";
import axios from "axios";
import parse from 'html-react-parser';
import useAuth from "../../hooks/useAuth";
import RecipeIngredients from "../../components/RecipeIngredients/RecipeIngredients";
import "./RecipePage.css"


const RecipePage = (props) => {

    let idList = [];
    const [isFavorite, setIsFavorite] = useState(false);
    const [user, token] = useAuth();
    const [recipeInfo, setRecipeInfo] = useState({});
    
    useEffect(() => {
        getRecipeInformation();
    }, [])
    
    useEffect(() => {
        favoriteCheck();
    }, [recipeInfo])

    // useEffect(() => {
    //     summarySplit();
    // }, [])
    
    
    async function getRecipeInformation(){
        let response = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${props.selectedRecipe.id}/information`, {
            headers: {
                "X-RapidAPI-Key": "1f1ce1238dmsh36abaf75fb5955cp1c20f7jsn99509f578ee6",
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            }
        });
        setRecipeInfo(response.data);
    }
    
    // function summarySplit(){
    //         let summary = recipeInfo.summary
    //         console.log("Summary", summary)
    //         let parsed = parse(summary);
    //         console.log("Parse", parsed)
    //     }
        
        async function favoriteCheck(){
            let response = await axios.get(`http://127.0.0.1:8000/api/favorite_recipes/`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            response.data.forEach(recipe => {
                idList.push(recipe.recipe_id)
                console.log(recipeInfo.id)
            });
            if(idList.includes(recipeInfo.id)){
                setIsFavorite(true);
            }
            else{
                setIsFavorite(false);
            }
        }
        
    async function handleAdd(){
        let response = await axios.post(`http://127.0.0.1:8000/api/favorite_recipes/`, {recipe_id : recipeInfo.id}, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        if(response.status === 200){
            setIsFavorite(true);
        }
    }
    
    async function handleDelete(){
        let response = await axios.delete(`http://127.0.0.1:8000/api/favorite_recipes/${recipeInfo.id}/`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        if(response.status === 204){
            setIsFavorite(false);
        }
    }


    
    return ( 
        <div>
            <div>
                {!user ?
                <p></p>:
                <div>
                    {isFavorite ? 
                    <div>
                        <p>This Recipe is in your Favorites</p>
                        <button onClick={handleDelete}>Remove from Favorites</button>
                    </div>:
                    <button className="addToFavorite" onClick={handleAdd} >Add to Favorites</button>
                    }
                </div>
                }
            </div>
            <div className="row">
                <div className="column">
                    <h2 className="recipeTitle" >{recipeInfo.title}</h2>
                    <img className="recipeImage" src={recipeInfo.image} alt="Selected Recipe" />
                    {recipeInfo.vegetarian === true &&
                    <p className="vegetarian">Vegetarian: True</p>
                    }
                    {recipeInfo.vegetarian === false &&
                    <p className="vegetarian">Vegetarian: False</p>
                    }
                    <p className="vegetarian">Ready in {recipeInfo.readyInMinutes} Minutes</p>
                    <p className="servings">Servings: {recipeInfo.servings}</p>
                </div>
                <div className="column-ingredients">
                    <h3 className="ingredients-header">Ingredients</h3>
                    {recipeInfo.extendedIngredients && 
                    recipeInfo.extendedIngredients.map((ingredient, index) => {
                        return(
                            <RecipeIngredients token={token} ingredient={ingredient} index={index} />
                        )
                    })}
                </div>
            </div>
            <div className="row">
                <div className="column">
                    {recipeInfo.instructions && 
                    <div>
                        <h3 className="instructions-header">Instructions</h3>
                        <p className="instructions">{recipeInfo.instructions}</p>
                    </div>
                    }
                </div>
                <div className="column-summary">
                    <h3 className="summary-header">Summary</h3>
                    <p className="summary">{recipeInfo.summary && parse(recipeInfo.summary)}</p>
                </div>
            </div>
            {/* {recipeInfo && 
            <div>
            {recipeInfo.analyzedInstructions[0].steps[0].step}
            {recipeInfo.analyzedInstructions[0].steps[1].step}
            </div>
            } */}
        </div>
     );
}
 
export default RecipePage;
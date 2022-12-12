import { useEffect, useState } from "react";
import axios from "axios";
import parse from 'html-react-parser';
import useAuth from "../../hooks/useAuth";
import RecipeIngredients from "../../components/RecipeIngredients";


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
                    <button onClick={handleAdd} >Add to Favorites</button>
                    }
                </div>
                }
            </div>
            <h2>{recipeInfo.title}</h2>
            <img src={recipeInfo.image} alt="Selected Recipe" />
            {recipeInfo.vegetarian === true &&
            <p>Vegetarian: True</p>
            }
            {recipeInfo.vegetarian === false &&
            <p>Vegetarian: False</p>
            }
            <p>Ready in {recipeInfo.readyInMinutes} Minutes</p>
            <p>Servings: {recipeInfo.servings}</p>
            <h3>Ingredients</h3>
            {recipeInfo.extendedIngredients && 
                recipeInfo.extendedIngredients.map((ingredient, index) => {
                    return(
                        <RecipeIngredients token={token} ingredient={ingredient} index={index} />
                    )
            })}
            {recipeInfo.instructions && 
            <p>{recipeInfo.instructions}</p>
            }
            {/* {recipeInfo.analyzedInstructions[0].steps[0].step} */}
            <p>{recipeInfo.summary && parse(recipeInfo.summary)}</p>
        </div>
     );
}
 
export default RecipePage;
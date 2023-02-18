import { useEffect, useState } from "react";
import axios from "axios";
import parse from 'html-react-parser';
import useAuth from "../../hooks/useAuth";
import RecipeIngredients from "../../components/RecipeIngredients/RecipeIngredients";
import "./RecipePage.css"
import MealPlannerForm from "../../components/MealPlannerForm/MealPlannerForm";


const RecipePage = (props) => {

    let idList = [];
    const [isFavorite, setIsFavorite] = useState(false);
    const [user, token] = useAuth();
    const [recipeInfo, setRecipeInfo] = useState({});
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        getRecipeInformation();
    }, [])
    
    useEffect(() => {
        favoriteCheck();
    }, [recipeInfo])

    
    
    async function getRecipeInformation(){
        let response = await axios.get(`https://api.spoonacular.com/recipes/${props.selectedRecipe.id}/information?apiKey=d7a4ab507bb8446f8adbe2de0d7cc7e6`)
        setRecipeInfo(response.data);
    }
    
        
        async function favoriteCheck(){
            let response = await axios.get(`http://127.0.0.1:8000/api/favorite_recipes/`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            response.data.forEach(recipe => {
                idList.push(recipe.recipe_id);
            });
            if(idList.includes(recipeInfo.id.toString())){
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

    function handleModalOpen() {
        setShowModal(true);
    }

    function handleModalClose() {
        setShowModal(false);
    }

    async function addToMealPlanner(meal, recipe) {
        if(meal === "breakfast"){
            let response = await axios.patch("http://127.0.0.1:8000/api/meal_planner/1/", {
            "breakfast_id": recipe,
        }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            console.log(`Added recipe ${recipeInfo.id} to ${meal}`);
        }
        if(meal === "lunch"){
            let response = await axios.patch("http://127.0.0.1:8000/api/meal_planner/1/", {
            "lunch_id": recipe,
        }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            console.log(`Added recipe ${recipeInfo.id} to ${meal}`);
        }
        if(meal === "dinner"){
            let response = await axios.patch("http://127.0.0.1:8000/api/meal_planner/1/", {
            "dinner_id": recipe,
        }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            console.log(`Added recipe ${recipeInfo.id} to ${meal}`);
        }
      };
    
    return ( 
        <div>
            <div>
                {!user ?
                <p></p>:
                <div>
                    {isFavorite ? 
                    <div className="remove-from-favorite">
                        <p>This Recipe is in your Favorites</p>
                        <button onClick={handleDelete}>Remove from Favorites</button>
                    </div>:
                    <button className="add-to-favorite" onClick={handleAdd} >Add to Favorites</button>
                    }
                    <button onClick={handleModalOpen}>Add to Meal Planner</button>
                    {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <MealPlannerForm
              recipe={recipeInfo.id}
              closeModal={handleModalClose}
              addToMealPlanner={addToMealPlanner}
            />
          </div>
        </div>
      )}
                </div>
                }
            </div>
            <div className="row">
                <div className="column">
                    <h2 className="recipeTitle" >{recipeInfo.title}</h2>
                    <img className="recipeImage" src={recipeInfo.image} alt="Selected Recipe" />
                    {recipeInfo.vegetarian === true &&
                    <p className="vegetarian">This dish is Vegetarian</p>
                    }
                    {recipeInfo.vegetarian === false &&
                    <p className="vegetarian">This dish is not Vegetarian</p>
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
                        <p className="instructions">{recipeInfo.instructions && parse(recipeInfo.instructions)}</p>
                    </div>
                    }
                </div>
                <div className="column-summary">
                    <h3 className="summary-header">Summary</h3>
                    <p className="summary">{recipeInfo.summary && parse(recipeInfo.summary.slice(0, 692))}</p>
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
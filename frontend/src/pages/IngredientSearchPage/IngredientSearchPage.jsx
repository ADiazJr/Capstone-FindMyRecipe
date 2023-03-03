import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IngredientSearchPage.css"


const IngredientSearchPage = (props) => {

    let navigate = useNavigate();
    let searchList = [];
    const [recipes, setRecipes] = useState([])
    const [ingredientList, setIngredientList] = useState([
        { ingredient: "" },
        { ingredient: "" },
    ])

    const handleIngredientAdd = () => {
        setIngredientList([...ingredientList, { ingredient: "" }]) 
    }

    const handleIngredientRemove = (index) => {
        const list = [...ingredientList];
        list.splice(index, 1);
        setIngredientList(list)  
    }

    const handleIngredientChange = (event, index) => {
        const { name, value } =  event.target;
        const list = [...ingredientList];
        list[index][name] = value;
        setIngredientList(list);
    }

    console.log(ingredientList)
    function searchClick(){
        ingredientList.map((ingredient) => {
            searchList.push(ingredient.ingredient)
            return(
                searchList
            )
        })
        ingredient_search(searchList)
    }

    console.log(searchList)
    async function ingredient_search(ingredients){
        let response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=d7a4ab507bb8446f8adbe2de0d7cc7e6&number=20`)
        setRecipes(response.data)
     }

     function handleClick(event, recipe){
        event.preventDefault();
        props.setSelectedRecipe(recipe);
        navigate(`/read/${recipe.id}`);
     }


    return (                                                      
        <div className="colums-container">
            <div className="column-search">
                <h3 className="header">Ingredient Search</h3>
                <p className="directions">Enter Ingredients</p>
                <form>
                    {ingredientList.map((ingredient, index) => (
                        <div key={index}>
                            <div>
                                <input className="ingredient-input" 
                                name="ingredient" 
                                placeholder="type ingredient" 
                                type="text" 
                                id="ingredient" required 
                                value={ingredient.ingredient}
                                onChange={(e) => handleIngredientChange(e, index)}
                                />
                                {ingredientList.length - 1 === index && ingredientList.length < 10 &&
                            ( 
                                <button type="button" onClick={handleIngredientAdd}>
                                <span>Add an ingredient</span>
                            </button>
                            )}
                            </div>
                            <div>
                                {ingredientList.length > 1 && (
                                <button type="button"
                                onClick={() => handleIngredientRemove(index)}
                                >
                                    <span>Remove</span>
                                </button>
                                )}   
                            </div>
                        </div>
                    ))}
                </form>
                <button type="button" onClick={searchClick}>Search</button>
            </div>
            <div>
                <ul className="ingredient-list">
                    <div className="row-recipes">
                        <div className="column">
                        {recipes.slice(10).map((recipe) => {
                            return(
                                <li className="list-item">
                                    <button className="recipe-button" onClick={(e) => handleClick(e, recipe)} >
                                        <img className="recipe-image" src={recipe.image} alt="recipe"/>
                                        <p>{recipe.title}</p>
                                    </button>
                                </li>
                            )
                        })}
                        </div>
                        <div className="column">
                        {recipes.slice(0, 10).map((recipe) => {
                            return(
                                <li className="list-item">
                                    <button className="recipe-button" onClick={(e) => handleClick(e, recipe)} >
                                        <img className="recipe-image" src={recipe.image} alt="recipe"/>
                                        <p>{recipe.title}</p>
                                    </button>
                                </li>
                            )
                        })}
                        </div>
                    </div>
                </ul>
            </div>
        </div>    
     );
}
 
export default IngredientSearchPage;
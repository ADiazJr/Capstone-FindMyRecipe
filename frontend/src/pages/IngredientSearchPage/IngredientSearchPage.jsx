import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
        let response = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredients}`, {
            headers: {
                "X-RapidAPI-Key": "1f1ce1238dmsh36abaf75fb5955cp1c20f7jsn99509f578ee6",
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            }
        })
        setRecipes(response.data)
     }

     function handleClick(event, recipe){
        event.preventDefault();
        props.setSelectedRecipe(recipe);
        navigate(`/read/${recipe.id}`);
     }


    return (                                                      
        <div>
            <div>
                <h3>Ingredient Search</h3>
                <p>Enter Ingredients</p>
                <form>
                    {ingredientList.map((ingredient, index) => (
                        <div key={index}>
                            <div>
                                <input name="ingredient" type="text" id="ingredient" required 
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
                <ul>
                    {recipes.map((recipe) => {
                        return(
                            <li>
                                <button onClick={(e) => handleClick(e, recipe)} >
                                    <img src={recipe.image} alt="recipe"/>
                                    <p>{recipe.title}</p>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>    
     );
}
 
export default IngredientSearchPage;
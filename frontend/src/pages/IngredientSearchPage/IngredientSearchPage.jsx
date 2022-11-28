import axios from "axios";
import { useState } from "react";


const IngredientSearchPage = (props) => {

    const [ingredients, setIngredients] = useState([])
    const [ingredientList, setIngredientList] = useState([
        { ingredient: "" },
        { ingredient: "" },
    ])

    const handleIngredientAdd = () => {
        setIngredientList([...ingredientList, { ingredient: "" }]) 
    }

    async function ingredient_search(ingredients){
        let response = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredients}`, {
            headers: {
                "X-RapidAPI-Key": "1f1ce1238dmsh36abaf75fb5955cp1c20f7jsn99509f578ee6",
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            }
        })
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
                                <input placeholder="ex: tomato" />
                                {ingredientList.length - 1 === index && ingredientList.length < 10 &&
                            ( 
                                <button type="button" onClick={handleIngredientAdd}>
                                <span>Add an ingredient</span>
                            </button>
                            )}
                                
                            </div>
                            <div>
                                {ingredientList.length > 1 && (
                                <button type="button">
                                    <span>Remove</span>
                                </button>
                                )}   
                            </div>
                        </div>
                    ))}
                </form>
                <button type="submit">Search</button>
            </div>
            <div>
                <ul>
                </ul>
            </div>
        </div>    
     );
}
 
export default IngredientSearchPage;
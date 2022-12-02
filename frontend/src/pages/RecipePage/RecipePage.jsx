import { useEffect, useState } from "react";
import axios from "axios";
import parse from 'html-react-parser';


const RecipePage = (props) => {

    useEffect(() => {
        getRecipeInformation();
    }, [])
    
    const [recipeInfo, setRecipeInfo] = useState({})

     async function getRecipeInformation(){
        let response = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${props.selectedRecipe.id}/information`, {
            headers: {
                "X-RapidAPI-Key": "1f1ce1238dmsh36abaf75fb5955cp1c20f7jsn99509f578ee6",
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
              }
            })
        setRecipeInfo(response.data)
    }
    
    return ( 
        <div>
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
            {/* {recipeInfo.cuisines.length > 0 && 
            <p>Cuisines: {recipeInfo.cuisines}</p>
            }            */}
            {recipeInfo.instructions && 
            <p>{recipeInfo.instructions}</p>
            }
            {/* {recipeInfo.analyzedInstructions[0].steps[1].step} */}
            {console.log(recipeInfo.summary)}
            <p>{recipeInfo.summary && parse(recipeInfo.summary)}</p>
        </div>
     );
}
 
export default RecipePage;
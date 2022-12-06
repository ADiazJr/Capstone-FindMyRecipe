import { useEffect, useState } from "react";
import axios from "axios";
import parse from 'html-react-parser';
import useAuth from "../../hooks/useAuth";


const RecipePage = (props) => {

    const [isFavorite, setIsFavorite] = useState(false)
    const [user, token] = useAuth();
    const [recipeInfo, setRecipeInfo] = useState({})

    useEffect(() => {
        getRecipeInformation();
        // summarySplit();
    }, [])
    

     async function getRecipeInformation(){
        let response = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${props.selectedRecipe.id}/information`, {
            headers: {
                "X-RapidAPI-Key": "1f1ce1238dmsh36abaf75fb5955cp1c20f7jsn99509f578ee6",
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
              }
            })
        setRecipeInfo(response.data)
    }

    // function summarySplit(){
    //     console.log(parse(recipeInfo.summary))
    //     let parsed = parse(recipeInfo.summary);
    //     parsed.split("Similar")
    // }

    // function favoriteCheck(){
    //     let response = await axios.get
    // }

    async function handleClick(){
        let response = await axios.post(`http://127.0.0.1:8000/api/favorite_recipes/`, {recipe_id : recipeInfo.id}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        if(response.status === 200){
            console.log('succesfully posted recipe')
            var e = document.getElementById("favorited");
            e.disabled = true
        }
    }
    
    return ( 
        <div>
            {!user ?
            <p></p>:
            <button id="favorited" onClick={handleClick} >Add to Favorites</button>
            }
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
            <p>{recipeInfo.summary && parse(recipeInfo.summary)}</p>
        </div>
     );
}
 
export default RecipePage;
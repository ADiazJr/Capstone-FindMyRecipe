import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css"

const SearchPage = (props) => {

    useEffect(() => {
        props.randomRecipes();
    }, [])

    let navigate = useNavigate();

    function handleClick(event, recipe){
        event.preventDefault();
        props.setSelectedRecipe(recipe);
        navigate(`/read/${recipe.id}`);
    }

    
    return ( 
        <div>
            <ul className="unorderedList">
                {props.recipes.map((recipe) => {
                    return(
                        <li>
                            <button className="recipe-button" onClick={(e) => handleClick(e, recipe)} >
                                <img className="image" src={recipe.image} alt="specific to the recipe" />
                                <p>{recipe.title}</p>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
     );
}
 
export default SearchPage;
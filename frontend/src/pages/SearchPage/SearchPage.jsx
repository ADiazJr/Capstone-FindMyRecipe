import { useNavigate } from "react-router-dom";
import "./SearchPage.css"

const SearchPage = (props) => {

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
                            <button onClick={(e) => handleClick(e, recipe)} >
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
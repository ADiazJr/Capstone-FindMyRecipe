import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const SearchBar = (props) => {

    const [user] = useAuth();
    let navigate = useNavigate();
    const [search, setSearch] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        props.getRecipes(search);
    }

    function handleClick(event){
        event.preventDefault();
        navigate("/ingredient_search");
    }

    function handleFavorite(event){
        event.preventDefault();
        navigate("/favorite_recipes")
    }

    return ( 
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input placeholder="search" value={search} onChange={(event) => setSearch(event.target.value)} />
                </div>
            </form>
            <form>
                <div>
                    <button onClick={handleClick}>Ingredient Search</button>
                </div>
            </form>
            {!user ?
            <p></p>:
            <form>
                <div>
                    <button onClick={handleFavorite}>Favorite Recipes</button>
                </div>
            </form>
            }
        </div>
     );
}
 
export default SearchBar;
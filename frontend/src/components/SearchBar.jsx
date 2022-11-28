import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SearchBar = (props) => {

    let navigate = useNavigate();
    const [search, setSearch] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        props.getRecipes(search);
    }

    function handleClick(event){
        navigate("/ingredient_search");
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
        </div>
     );
}
 
export default SearchBar;
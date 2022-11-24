import { useState } from "react";


const SearchBar = (props) => {

    const [search, setSearch] = useState("")

    function handleSubmit(event){
        event.preventDefault();
        props.getRecipes(search)
    }

    return ( 
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <input placeholder="search" value={search} onChange={(event) => setSearch(event.target.value)} />
            </div>
        </form>
     );
}
 
export default SearchBar;
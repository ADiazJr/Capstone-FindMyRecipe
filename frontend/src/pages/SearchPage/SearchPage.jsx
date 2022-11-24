

const SearchPage = (props) => {

    
    return ( 
        <div>
            <ul>
                {props.recipes.map((recipe) => {
                    return(
                        <li>
                            <button>
                                <img src={recipe.image} alt="specific to the recipe" />
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
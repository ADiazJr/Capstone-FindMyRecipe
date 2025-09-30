import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [user] = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;
    props.getRecipes(query);
  }

  function handleIngredientSearch() {
    navigate("/ingredient_search");
  }

  function handleFavorite() {
    navigate("/favorite_recipes");
  }

  function handleList() {
    navigate("/shopping_list");
  }

  function handleMeal() {
    navigate("/meal_planner");
  }

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__input"
          placeholder="Search for a recipe"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search for a recipe"
        />
        <button className="search__submit" type="submit">
          Search
        </button>
      </form>
      <div className="search__links">
        <button type="button" className="search__chip" onClick={handleIngredientSearch}>
          Ingredient Search
        </button>
        {user && (
          <div className="search__chip-group">
            <button type="button" className="search__chip" onClick={handleFavorite}>
              Favorite Recipes
            </button>
            <button type="button" className="search__chip" onClick={handleList}>
              Shopping List
            </button>
            <button type="button" className="search__chip" onClick={handleMeal}>
              Meal Planner
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

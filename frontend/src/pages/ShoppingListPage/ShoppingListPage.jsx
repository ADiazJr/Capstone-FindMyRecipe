import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


const ShoppingListPage = (props) => {

    useEffect(() => {
        getShoppingList();
    }, [])

    const [user, token] = useAuth();
    const [ingredients, setIngredients] = useState([])

    async function getShoppingList(){
        let response = await axios.get(`http://127.0.0.1:8000/api/shopping_list/`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        setIngredients(response.data)
    }

    return ( 
        <div>
            <h3>Shopping List</h3>
            {!user ? 
                <p></p>:
                <div>
                    {ingredients.map((ingredient) => {
                        return(
                            <p>Ingredient: {ingredient.ingredient}</p>
                        )
                    })}
                </div>
            }
        </div>
     );
}
 
export default ShoppingListPage;
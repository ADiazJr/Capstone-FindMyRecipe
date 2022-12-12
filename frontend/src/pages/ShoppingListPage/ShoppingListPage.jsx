import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


const ShoppingListPage = (props) => {

    useEffect(() => {
        getShoppingList();
    }, [])

    const [user, token] = useAuth();
    const [ingredients, setIngredients] = useState([]);
    const [manual, setManual] = useState("");

    async function getShoppingList(){
        let response = await axios.get(`http://127.0.0.1:8000/api/shopping_list/`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        setIngredients(response.data);
    }

    async function handleClick(id){
        let response = await axios.delete(`http://127.0.0.1:8000/api/shopping_list/${id}/`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        if(response.status === 204){
            getShoppingList();
        }
    }

    async function handleAdd(e, name){
        e.preventDefault();
        let response = await axios.post(`http://127.0.0.1:8000/api/shopping_list/`, {ingredient: name}, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        if(response.status === 200){
            getShoppingList();
        }
    }


    return ( 
        <div>
            <h3>Shopping List</h3>
            {!user ? 
                <p></p>:
                <div>
                    <form onSubmit={(e) => handleAdd(e, manual)} >
                    <input placeholder="Add ingredient" value={manual} onChange={(event) => setManual(event.target.value)} />
                    <button type="submit" >Submit</button>
                    </form>
                    {ingredients.slice(0).reverse().map((ingredient) => {
                        return(
                            <div>
                                <p>Ingredient: {ingredient.ingredient}</p>
                                <button onClick={() => handleClick(ingredient.id)} >Delete Ingredient</button>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
     );
}
 
export default ShoppingListPage;
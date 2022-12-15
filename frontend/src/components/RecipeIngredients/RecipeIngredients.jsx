import axios from "axios";
import { useState } from "react";
import "./RecipeIngredients.css"


const RecipeIngredients = (props) => {

    const [confirmation, setConfirmation] = useState(false);

    async function handleList(name){
        let response = await axios.post(`http://127.0.0.1:8000/api/shopping_list/`, {ingredient: name}, {
            headers: {
                Authorization: "Bearer " + props.token
            }
        });
        if(response.status === 200){
            setConfirmation(true);
        }
    }

    return ( 
    <div className="ingredient" >
        <p className="ingredient-name" >Name: {props.ingredient.name}</p>
        <p className="ingredient-amount" >Amount: {props.ingredient.amount}{props.ingredient.unit} </p>
        <button className="shopping-button" onClick={() => handleList(props.ingredient.name)} >Add to Shopping List</button>
        {confirmation === false ?
            <p></p> :
            <p>Ingredient Added!</p> 
        }
    </div>
     );
}
 
export default RecipeIngredients;
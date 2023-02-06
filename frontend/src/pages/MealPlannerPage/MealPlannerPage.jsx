import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./MealPlannerPage.css"


const MealPlannerPage = (props) => {

    const [mealData, setMealData] = useState([])
    const [mealPlanner, setMealPlanner] = useState([])

    useEffect(() => {
        getMealPlanner();
    }, [])

   

    const [user, token] = useAuth();

    async function getMealPlanner(){
        let response = await axios.get(`http://127.0.0.1:8000/api/meal_planner/`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        setMealData(response.data);
        mealDataChange(response.data)
        console.log("meal Data", response.data)
        console.log("user", user)
    }

    async function mealDataChange(mealData){
            let breakfast = await idToRecipe(mealData[0].breakfast_id)
            let lunch = await idToRecipe(mealData[0].lunch_id)
            let dinner = await idToRecipe(mealData[0].dinner_id)
            setMealPlanner([breakfast, lunch, dinner])
    }

    async function idToRecipe(id){
        let response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=d7a4ab507bb8446f8adbe2de0d7cc7e6`)
        return response.data
    }

    async function deleteFromMeal(numberToDelete){
        if (numberToDelete == 1){
        let response = await axios.patch("http://127.0.0.1:8000/api/meal_planner/1/", {
           
            "breakfast_id": "00000"
    
    }  ,{
            headers: {
                Authorization: "Bearer " + token
            },
        });
    }
        if (numberToDelete == 2){
            let response = await axios.patch("http://127.0.0.1:8000/api/meal_planner/1/", {
           
            "lunch_id": "00000"
    
    }  ,{
            headers: {
                Authorization: "Bearer " + token
            },
        });
    }
        if (numberToDelete == 3){
            let response = await axios.patch("http://127.0.0.1:8000/api/meal_planner/1/", {
           
            "dinner_id": "00000"
    
    }  ,{
            headers: {
                Authorization: "Bearer " + token
            },
        });
    }
        getMealPlanner();

    }

    return (
        <div>
            {!user ? 
            <p></p>:
            <div>
                {mealPlanner[0] == "00000" && 
                <div>
                    <button>Add Recipe 1 to Meal Planner</button>
                </div>
                }
                {mealPlanner[1] == "00000" && 
                <div>
                    <button>Add Recipe 2 to Meal Planner</button>
                </div>
                }
                {mealPlanner[2] == "00000" && 
                <div>
                    <button>Add Recipe 3 to Meal Planner</button>
                </div>
                }
                    <form>
                        <table>
                            <thead>
                                <tr>
                                    <th>Breakfast</th>
                                    <th>Lunch</th>
                                    <th>Dinner</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {mealPlanner.length > 2 ?
                                        <>
                                        <td>{mealPlanner[0].title}<img className="meal-image" src={mealPlanner[0].image} /><button onClick={deleteFromMeal(1)}>Delete from Meal Planner</button></td>
                                        <td>{mealPlanner[1].title}<img className="meal-image" src={mealPlanner[1].image} /><button>Delete from Meal Planner</button></td>
                                        <td>{mealPlanner[2].title}<img className="meal-image" src={mealPlanner[2].image} /><button>Delete from Meal Planner</button></td>
                                        </>:
                                        <td></td>
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </form>
            </div>
            }
        </div>
      );
}
 
export default MealPlannerPage;
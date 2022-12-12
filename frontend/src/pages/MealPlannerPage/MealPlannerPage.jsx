import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


const MealPlannerPage = (props) => {

    const [mealData, setMealData] = useState([])
    let mealPlanner = []

    useEffect(() => {
        getMealPlanner();
    }, [])

    useEffect(() => {
        mealDataChange();
    }, [mealData])

    const [user, token] = useAuth();

    async function getMealPlanner(){
        let response = await axios.get(`http://127.0.0.1:8000/api/meal_planner/`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        setMealData(response.data);
        console.log("meal Data", mealData)
    }

    function mealDataChange(){
        mealData.forEach((object) => {
            idToRecipe(object.breakfast_id)
            idToRecipe(object.lunch_id)
            idToRecipe(object.dinner_id)
        });
    }

    async function idToRecipe(id){
        let response = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
            headers: {
                "X-RapidAPI-Key": "1f1ce1238dmsh36abaf75fb5955cp1c20f7jsn99509f578ee6",
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            }
        });
        mealPlanner.push(response.data)
        console.log("meal Planner", mealPlanner)
    }

    return (
        <div>
            {!user ? 
            <p></p>:
            <div>
                <button onClick={getMealPlanner} >Load Meal Planner</button>
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
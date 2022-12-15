import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


const MealPlannerPage = (props) => {

    const [mealData, setMealData] = useState([])
    const [mealPlanner, setMealPlanner] = useState([])

    useEffect(() => {
        getMealPlanner();
    }, [])

    useEffect(() => {
        if(mealData.length >0){
            mealDataChange();
        }
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

    async function mealDataChange(){
            let breakfast = await idToRecipe(mealData[0].breakfast_id)
            let lunch = await idToRecipe(mealData[0].lunch_id)
            let dinner = await idToRecipe(mealData[0].dinner_id)
            setMealPlanner([breakfast, lunch, dinner])
    }

    async function idToRecipe(id){
        let response = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
            headers: {
                "X-RapidAPI-Key": "1f1ce1238dmsh36abaf75fb5955cp1c20f7jsn99509f578ee6",
                "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            }
        });
        return response.data
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
                                    {mealPlanner.length > 2 ?
                                        <>
                                        <td>{mealPlanner[0].title}<img src={mealPlanner[0].image} /></td>
                                        <td>{mealPlanner[1].title}<img src={mealPlanner[1].image} /></td>
                                        <td>{mealPlanner[2].title}<img src={mealPlanner[2].image} /></td>
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
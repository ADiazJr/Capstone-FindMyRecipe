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

    useEffect(() => {
        if(mealData.length > 0){
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
        console.log(response.data)
        console.log("meal Data", mealData)
    }

    async function mealDataChange(){
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
        let patchData = {};
        switch (numberToDelete) {
            case 1:
                patchData.breakfast_id = null;
                break;
            case 2:
                patchData.lunch_id = null;
                break;
            case 3:
                patchData.dinner_id = null;
                break;
            default:
                return;
        }
        let response = await axios.patch("http://127.0.0.1:8000/api/meal_planner/1/", patchData, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        setMealData(response.data);
    }
    


    return (
        <div>
            {!user ? 
            <p></p>:
            <div>
                {!mealPlanner[0] && 
                <div>
                    <button>Add Recipe 1 to Meal Planner</button>
                </div>
                }
                {!mealPlanner[1] && 
                <div>
                    <button>Add Recipe 2 to Meal Planner</button>
                </div>
                }
                {!mealPlanner[2] && 
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
                                        <td>{mealPlanner[0].title}<img className="meal-image" src={mealPlanner[0].image} /><button onClick={() => deleteFromMeal(1)}>Delete From Meal Planner</button></td>
                                        <td>{mealPlanner[1].title}<img className="meal-image" src={mealPlanner[1].image} /><button onClick={() => deleteFromMeal(2)}>Delete From Meal Planner</button></td>
                                        <td>{mealPlanner[2].title}<img className="meal-image" src={mealPlanner[2].image} /><button onClick={() => deleteFromMeal(3)}>Delete From Meal Planner</button></td>

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



/* <form onSubmit={handleSubmit}>
  <label>
    Meal Name:
    <input type="text" name="mealName" />
  </label>
  <label>
    Ingredients:
    <textarea name="ingredients"></textarea>
  </label>
  <label>
    Instructions:
    <textarea name="instructions"></textarea>
  </label>
  <label>
    Day:
    <select name="day">
      <option value="Monday">Monday</option>
      <option value="Tuesday">Tuesday</option>
      <option value="Wednesday">Wednesday</option>
      <option value="Thursday">Thursday</option>
      <option value="Friday">Friday</option>
      <option value="Saturday">Saturday</option>
      <option value="Sunday">Sunday</option>
    </select>
  </label>
  <button type="submit">Add Meal<
*/

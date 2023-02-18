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
    async function mealDataChange() {
        const breakfastId = mealData[0].breakfast_id;
        const lunchId = mealData[0].lunch_id;
        const dinnerId = mealData[0].dinner_id;
        
        const recipes = await Promise.all([
            breakfastId ? idToRecipe(breakfastId) : null,
            lunchId ? idToRecipe(lunchId) : null,
            dinnerId ? idToRecipe(dinnerId) : null,
        ]);
        setMealPlanner(recipes);
    }
    

    async function idToRecipe(id){
        let response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=56dd34702a3a487894f9c09f84c317b8`)
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
          {!user ? (
            <p></p>
          ) : (
            <div>
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
                      {mealPlanner.length > 2 ? (
                        <>
                        <td className={mealPlanner[0] ? "" : "empty"}>
                        {mealPlanner[0] ? (
                            <>
                            <div className="meal-info">
                                <h3>{mealPlanner[0].title}</h3>
                                <img className="meal-image" src={mealPlanner[0].image} />
                            </div>
                            <button onClick={() => deleteFromMeal(1)}>Delete From Meal Planner</button>
                            </>
                        ) : (
                            ""
                        )}
                        </td>
                          <td className={mealPlanner[1] ? "" : "empty"}>
                            {mealPlanner[1] ? (
                                <>
                                <div className="meal-info">
                                    <h3>{mealPlanner[1].title}</h3>
                                    <img className="meal-image" src={mealPlanner[1].image} />
                                </div>
                                <button onClick={() => deleteFromMeal(2)}>Delete From Meal Planner</button>
                                </>
                            ) : (
                                ""
                            )}
                            </td>

                          <td className={mealPlanner[2] ? "" : "empty"}>
                            {mealPlanner[2] ? (
                                <>
                                <div className="meal-info">
                                    <h3>{mealPlanner[2].title}</h3>
                                    <img className="meal-image" src={mealPlanner[2].image} />
                                </div>
                                <button onClick={() => deleteFromMeal(3)}>Delete From Meal Planner</button>
                                </>
                            ) : (
                                ""
                            )}
                            </td>

                        </>
                      ) : (
                        <td></td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          )}
        </div>
      );      
}
 
export default MealPlannerPage;
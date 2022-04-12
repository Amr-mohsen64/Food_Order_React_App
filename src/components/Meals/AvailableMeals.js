import React, { useEffect, useState } from 'react'
import classes from "./AvailableMeals.module.css"
import Card from "../UI/Card/Card";
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch("https://foodorder-2efd7-default-rtdb.firebaseio.com/meals.json")
            const responseData = await response.json();

            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({ id: key, ...responseData[key] })
            }
            setMeals(loadedMeals)
        }
        fetchMeals()
    }, [])


    const mealList = meals.map(meal => <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
    />);

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals
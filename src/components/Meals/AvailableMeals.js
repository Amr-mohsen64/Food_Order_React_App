import React, { useEffect, useState } from 'react'
import classes from "./AvailableMeals.module.css"
import Card from "../UI/Card/Card";
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);


    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true)
            const response = await fetch("https://foodorder-2efd7-default-rtdb.firebaseio.com/meals.json")

            if (!response.ok) {
                throw new Error("somthing went wrong")
            }
            const responseData = await response.json();

            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({ id: key, ...responseData[key] })
            }
            setMeals(loadedMeals)
            setIsLoading(false)
        }

        fetchMeals().catch(error => {
            setIsLoading(false)
            setHttpError(error.message)
        })

    }, [])

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>loading...</p>
            </section>
        )
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        )
    }

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
import React, { useRef, useState } from 'react'
import classes from './Checkout.module.css'

const isEmpty = (value) => value.trim() === ''
const isFiveChars = (value) => value.trim().length === 5

const Checkout = (props) => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        steet: true,
        postalCode: true,
        city: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault()

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode) && isFiveChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);


        setFormInputsValidity({
            name: enteredNameIsValid,
            steet: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid
        })

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalCodeIsValid &&
            enteredCityIsValid

        if (!formIsValid) {
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        })
    }

    const nameControlClasses = `${classes.control} ${!formInputsValidity.name && classes.invalid}`
    const streetControlClasses = `${classes.control} ${!formInputsValidity.steet && classes.invalid}`
    const postalCodeControlClasses = `${classes.control} ${!formInputsValidity.postalCode && classes.invalid}`
    const cityControlClasses = `${classes.control} ${!formInputsValidity.city && classes.invalid}`

    return (
        <form onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    id='name'
                    type='text'
                    ref={nameInputRef}
                />
                {!formInputsValidity.name && <p>please enter a valid Name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input
                    id='street'
                    type='text'
                    ref={streetInputRef}
                />
                {!formInputsValidity.steet && <p>please enter a valid steet</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input
                    id='postal'
                    type='text'
                    ref={postalCodeInputRef}
                />
                {!formInputsValidity.postalCode && <p>please enter a Postal Code (must b 5 charchters)</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input
                    id='city'
                    type='text'
                    ref={cityInputRef}
                />
                {!formInputsValidity.city && <p>please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCancel} type='button'>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout
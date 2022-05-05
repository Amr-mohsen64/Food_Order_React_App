import React, { useRef } from 'react'
import classes from './Checkout.module.css'

const Checkout = (props) => {
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
    }

    return (
        <form onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input
                    id='name'
                    type='text'
                    ref={nameInputRef}
                />
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Street</label>
                <input
                    id='street'
                    type='text'
                    ref={streetInputRef}
                />
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input
                    id='postal'
                    type='text'
                    ref={postalCodeInputRef}
                />
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input
                    id='city'
                    type='text'
                    ref={cityInputRef}
                />
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCancel} type='button'>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout
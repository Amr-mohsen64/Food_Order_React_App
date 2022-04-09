import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../../Cart/CartIcon'
import classes from "./HeaderCartButton.module.css"
import CartContext from '../../../store/cart-context';


const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);
    
    //extract cart items
    const { items: cartItems } = cartCtx;

    const numberOfCartItems = cartItems.reduce((accum, item) => {
        return Math.abs(accum + item.amount)
    }, 0)

    const btnClass = `${classes.button} ${btnIsHighlighted ? classes.bump : ""} `

    useEffect(() => {
        if (cartItems.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        //remove animation class because the component will be exute again whrn th state changes
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300);

        //clear timer on destroy
        return () => {
            clearTimeout(timer)
        }
    }, [cartItems])

    return (
        <button className={btnClass} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton
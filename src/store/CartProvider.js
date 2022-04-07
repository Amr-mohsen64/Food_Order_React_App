import React from 'react'
import CartContext from './cart-context';


const CartProvider = props => {

    const addItemToCartHandler = (item) => {

    }

    const removeItemCartHandler = (id) => {

    }

    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        RemoveItem: removeItemCartHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}


export default CartProvider;
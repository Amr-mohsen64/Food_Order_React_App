import React, { useReducer } from 'react'
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        //updated = oldTotalAmount + newItem.price * newItem.amount 
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItems;
        
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)    //new array
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };

    } else if (action.type === "REMOVE_ITEM") {

    }
    return defaultCartState
}


const CartProvider = props => {
    // const [stateSnasphot,dispatch] = useReducer(reducer,initalState)
    const [cartSate, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: "ADD_ITEM",
            item: item
        })
    }

    const removeItemCartHandler = (id) => {
        dispatchCartAction({
            type: "REMOVE_ITEM",
            id: id
        })
    }

    const cartContext = {
        items: cartSate.items,
        totalAmount: cartSate.totalAmount,
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
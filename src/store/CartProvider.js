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
    }

    if (action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingCartItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingCartItem.price

        let updatedItems;

        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id)
        } else {
            const updatedItem = {
                ...existingCartItem, amount: existingCartItem.amount - 1
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'CLEAR_CART') {
        return defaultCartState
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

    const clearCartHandler = () => {
        dispatchCartAction({
            type: "CLEAR_CART",
        })
    }

    const cartContext = {
        items: cartSate.items,
        totalAmount: cartSate.totalAmount,
        addItem: addItemToCartHandler,
        RemoveItem: removeItemCartHandler,
        clearCart: clearCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}


export default CartProvider;
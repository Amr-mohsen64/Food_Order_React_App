import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = props => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item)
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.RemoveItem(id)
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmiting(true)
        await fetch("https://foodorder-2efd7-default-rtdb.firebaseio.com/orders.json", {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        }
        )
        setIsSubmiting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => {
                return <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={() => { cartItemAddHandler(item) }}
                    onRemove={() => cartItemRemoveHandler(item.id)}
                />
            })}
        </ul>
    )

    const modalActions = <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent =
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && < Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}
            {!isCheckout && modalActions}
        </>

    const isSubmitingModalContent = <p>Sending order data ...</p>
    const didSubmitModalContent =
        <>
            <p>success Send the order!</p>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
            </div>
        </>

    return (
        <Modal onClose={props.onClose}>
            {!isSubmiting && !didSubmit && cartModalContent}
            {isSubmiting && isSubmitingModalContent}
            {!isSubmiting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}


export default Cart
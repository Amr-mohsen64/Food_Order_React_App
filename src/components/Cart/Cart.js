import React, { useContext } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'

const Cart = props => {

    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {

    }

    const cartItemRemoveHandler = (id) => {

    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => {
                return <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={(item) => { cartItemAddHandler(item) }}
                    onRemove={(id) => cartItemRemoveHandler(item.id)}
                />
            })}
        </ul>
    )


    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}


export default Cart
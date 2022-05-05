import React from 'react';

const CartContext = React.createContext({
    // better auto completion as model
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    RemoveItem: (id) => {},
    clearCart: () => {},
})

export default CartContext;
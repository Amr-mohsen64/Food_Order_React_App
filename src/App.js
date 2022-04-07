import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShowen, setCartIsShowen] = useState(false);

  const showCartHandler = () => {
    setCartIsShowen(true);
  }

  const HideCartHandler = () => {
    setCartIsShowen(false);
  }

  return (
    <CartProvider>
      {cartIsShowen && <Cart onClose={HideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main >
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

import {useState } from 'react';
import CartProvider from './store/cartProvider'
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
  const[cartIsShown,setcartIsShown]= useState(false)

  const showCartHandler=()=>
  {
    setcartIsShown(true)
  }
  const hideCartHandler=()=>
  {
    setcartIsShown(false)
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

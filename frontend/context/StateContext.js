import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item.data._id === product.data._id);

    const productPrice = parseFloat(product.data.price); // Ensure the price is parsed as a float

    setTotalPrice((prevTotalPrice) => prevTotalPrice + productPrice * quantity); // Use productPrice instead of product.price
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        };
        return cartProduct;
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${quantity} ${product.data.name} added to the cart.`);

  };

  const incQty = (product) => {
    const updatedCartItems = cartItems.map((cartProduct) =>
      cartProduct.data._id === product.data._id
        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
        : cartProduct
    );
    setCartItems(updatedCartItems);

    const updatedTotalPrice = updatedCartItems.reduce(
      (total, item) => total + parseFloat(item.data.price) * item.quantity,
      0
    );
    setTotalPrice(updatedTotalPrice);
  };

  const decQty = (product) => {
    const updatedCartItems = cartItems.map((cartProduct) =>
      cartProduct.data._id === product.data._id && cartProduct.quantity > 1
        ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
        : cartProduct
    );
    setCartItems(updatedCartItems);

    const updatedTotalPrice = updatedCartItems.reduce(
      (total, item) => total + parseFloat(item.data.price) * item.quantity,
      0
    );
    setTotalPrice(updatedTotalPrice);
  };


  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    setQty(1);
    toast.success("Cart Cleared!")
  };

  const removeProduct = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.data._id !== productId);
    setCartItems(updatedCartItems);

    const newTotalPrice = updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const newTotalQuantities = updatedCartItems.reduce((total, item) => total + item.quantity, 0);

    setTotalPrice(newTotalPrice);
    setTotalQuantities(newTotalQuantities);
  };


  const value = {
    cartItems,
    setCartItems,
    totalPrice,
    setTotalPrice,
    totalQuantities,
    setTotalQuantities,
    qty,
    setQty,
    incQty,
    decQty,
    onAdd,
    clearCart,
    removeProduct
  }

  return (

    <Context.Provider value={value}>
      {children}
    </Context.Provider>

  )
}

export const useStateContext = () => useContext(Context);

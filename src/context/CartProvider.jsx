import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../Api/functions/cartFunctions";
import { useAuth } from "./AuthProvider";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // cart stores the entire cart object from the API response
  const [cart, setCart] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const token = auth?.token;

  // ✅ Fetch user cart
  const fetchCart = async () => {
    if (!token) {
      setCart(null);
      setLoading(false); 
      return;
    }
    try {
      setLoading(true);
      await getCart(setCart, token); // setCart receives the full cart object
    } catch (error) {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // Mutator functions update the cart state with the full object returned by the API

  const addToCartContext = async (productId, quantity = 1) => {
    if (!token) {
      toast.info("Please login to add items to cart");
      return;
    }
    try {
      const data = { productId, quantity };
      const updatedCart = await addToCart(data, token);
      if (updatedCart) setCart(updatedCart); 
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItemContext = async (productId, quantity) => {
    if (!token) return;
    try {
      const data = { productId, quantity };
      const updatedCart = await updateCartItem(data, token);
      if (updatedCart) setCart(updatedCart);
    } catch (error) {
      console.log(error);
      fetchCart(); 
    }
  };

  const removeFromCartContext = async (productId) => {
    if (!token) return;
    try {
      const updatedCart = await removeFromCart(productId, token);
      if (updatedCart) setCart(updatedCart); 
    } catch (error) {
      console.log(error);
      fetchCart(); 
    }
  };

  const clearCartContext = async () => {
    if (!token) return;
    try {
      await clearCart(token);
      // Manually set to an empty cart structure for instant feedback
      setCart(prev => ({ ...prev, items: [] })); 
    } catch (error) {
      console.log(error);
    }
  };

  // Utility to check if product is in cart
  const isInCart = (productId) =>
    Array.isArray(cart?.items) &&
    cart.items.some((item) => item.product._id === productId);

  useEffect(() => {
    fetchCart();
  }, [token]);
  
  // Expose the items array as 'cart' for easy iteration, and the full object
  const cartItems = cart?.items || [];

  return (
    <CartContext.Provider
      value={{
        cart: cartItems, // The array of items for mapping
        cartObject: cart, // The full API object for totals/metadata
        loading,
        addToCartContext,
        updateCartItemContext,
        removeFromCartContext,
        clearCartContext,
        isInCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook
export const useCart = () => useContext(CartContext);
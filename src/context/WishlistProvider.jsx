import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllWhishlist,
  addWhishlist,
  deleteWhishlist,
} from "../Api/functions/wishlistFunctions";
import { useAuth } from "./AuthProvider";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const token = auth?.token;

  const fetchWishlist = async () => {
    if (!token) {
      setWishlist([]);
      return;
    }
    try {
      setLoading(true);
      await getAllWhishlist(setWishlist, token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to load wishlist");
    }
  };

  const addToWishlistContext = async (productId) => {
    if (!token) {
      toast.error("Please login to add to wishlist");
      return;
    }
    try {
      await addWhishlist({ productId }, token);
      // ✅ Corrected updater function
      setWishlist((prev) => [...prev, { productId: { _id: productId } }]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlistContext = async (wishlistId) => {
    if (!token) return;
    try {
      await deleteWhishlist(wishlistId, token);
      setWishlist((prev) => prev.filter((item) => item._id !== wishlistId));
    } catch (error) {
      console.log(error);
    }
  };

  const isInWishlist = (productId) =>
    Array.isArray(wishlist) && wishlist.some((item) => item?._id === productId);

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlistContext,
        removeFromWishlistContext,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

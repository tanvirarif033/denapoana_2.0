import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  getCart
} from "../services/cartService";

import {
  getWishlist
} from "../services/wishlistService";



const CartContext =
  createContext();



// PROVIDER
export function CartProvider({
  children
}) {

  const [cartCount, setCartCount] =
    useState(0);

  const [wishlistCount,
    setWishlistCount] =
    useState(0);


  // =========================
  // FETCH CART COUNT
  // =========================
  const fetchCartCount =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        // logout hole reset
        if (!token) {

          setCartCount(0);

          return;
        }

        const data =
          await getCart();

        setCartCount(
          data.cartItems?.length || 0
        );

      } catch (error) {

        setCartCount(0);
      }
    };


  // =========================
  // FETCH WISHLIST COUNT
  // =========================
  const fetchWishlistCount =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        // logout hole reset
        if (!token) {

          setWishlistCount(0);

          return;
        }

        const data =
          await getWishlist();

        setWishlistCount(
          data.wishlist?.length || 0
        );

      } catch (error) {

        setWishlistCount(0);
      }
    };


  // =========================
  // RESET COUNTS
  // =========================
  const resetCounts = () => {

    setCartCount(0);

    setWishlistCount(0);
  };


  useEffect(() => {

    fetchCartCount();

    fetchWishlistCount();

  }, []);


  return (

    <CartContext.Provider

      value={{

        cartCount,
        wishlistCount,

        fetchCartCount,
        fetchWishlistCount,

        resetCounts
      }}
    >

      {children}

    </CartContext.Provider>
  );
}



// HOOK
export const useCart = () =>
  useContext(CartContext);
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



// =======================
// PROVIDER
// =======================

export function CartProvider({
  children
}) {

  const [
    cartCount,
    setCartCount
  ]=useState(0);


  const [
    wishlistCount,
    setWishlistCount
  ]=useState(0);




  // =======================
  // CART COUNT
  // =======================

  const fetchCartCount=
  async()=>{

    try{

      const token=
      localStorage.getItem(
      "token"
      );


      if(!token){

        setCartCount(0);

        return;

      }



      const data=
      await getCart();



      setCartCount(

      data?.cartItems?.length

      ||

      0

      );

    }

    catch(error){

      console.log(error);

      setCartCount(0);

    }

  };







  // =======================
  // WISHLIST COUNT
  // =======================

  const fetchWishlistCount=
  async()=>{

    try{


      const token=
      localStorage.getItem(
      "token"
      );


      if(!token){

        setWishlistCount(0);

        return;

      }



      const data=
      await getWishlist();



      setWishlistCount(

      data?.wishlist?.length

      ||

      0

      );

    }

    catch(error){

      console.log(error);

      setWishlistCount(0);

    }

  };








  // =======================
  // RESET
  // =======================

  const resetCounts=()=>{

    setCartCount(0);

    setWishlistCount(0);

  };







  useEffect(()=>{

    fetchCartCount();

    fetchWishlistCount();

  },[]);







  return(

  <CartContext.Provider

  value={{

    cartCount,

    wishlistCount,

    fetchCartCount,

    fetchWishlistCount,

    setCartCount,

    setWishlistCount,

    resetCounts

  }}

  >

  {children}

  </CartContext.Provider>

  );

}




// =======================
// HOOK
// =======================

export const useCart=()=>{

return useContext(
CartContext
);

};
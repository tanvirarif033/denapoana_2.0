import api from "../api/axios";


// get wishlist
export const getWishlist =
  async () => {

    const response =
      await api.get("/wishlist");

    return response.data;
  };


// remove wishlist
export const removeWishlist =
  async (wishlistId) => {

    const response =
      await api.delete(
        `/wishlist/${wishlistId}`
      );

    return response.data;
  };
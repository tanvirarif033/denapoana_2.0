import api from "../api/axios";


// get cart
export const getCart =
  async () => {

    const response =
      await api.get("/cart");

    return response.data;
  };


// increase quantity
export const increaseQuantity =
  async (cartItemId) => {

    const response =
      await api.put(
        `/cart/increase/${cartItemId}`
      );

    return response.data;
  };


// decrease quantity
export const decreaseQuantity =
  async (cartItemId) => {

    const response =
      await api.put(
        `/cart/decrease/${cartItemId}`
      );

    return response.data;
  };


// remove cart
export const removeCartItem =
  async (cartItemId) => {

    const response =
      await api.delete(
        `/cart/${cartItemId}`
      );

    return response.data;
  };
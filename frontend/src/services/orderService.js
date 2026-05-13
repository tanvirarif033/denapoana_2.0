import api
from "../api/axios";



// =========================
// PLACE ORDER
// =========================

export const placeOrder =
  async (orderData) => {

    const { data } =
      await api.post(
        "/orders",
        orderData
      );

    return data;
  };



// =========================
// STRIPE PAYMENT
// =========================

export const stripeCheckout =
  async (orderData) => {

    const { data } =
      await api.post(
        "/orders/stripe",
        orderData
      );

    return data;
  };
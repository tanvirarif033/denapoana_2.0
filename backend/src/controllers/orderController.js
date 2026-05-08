const prisma = require("../config/prisma");

const stripe =
  require("../config/stripe");



// PLACE ORDER
const placeOrder = async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      address,
      paymentMethod
    } = req.body;

    // validation
    if (!address || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message:
          "Address & payment method required"
      });
    }

    // get cart items
    const cartItems =
      await prisma.cart.findMany({
        where: {
          userId
        },

        include: {
          product: true
        }
      });

    // check cart
    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    // total price
    let totalPrice = 0;

    cartItems.forEach((item) => {

      totalPrice +=
        item.product.price *
        item.quantity;
    });

    // stripe payment
    if (paymentMethod === "STRIPE") {

      const session =
        await stripe.checkout.sessions.create({
          payment_method_types: ["card"],

          line_items:
            cartItems.map((item) => ({
              price_data: {
                currency: "bdt",

                product_data: {
                  name:
                    item.product.title
                },

                unit_amount:
                  Math.round(
                    item.product.price * 100
                  )
              },

              quantity:
                item.quantity
            })),

          mode: "payment",

          success_url:
            "http://localhost:5173/payment-success",

          cancel_url:
            "http://localhost:5173/payment-cancel"
        });

      return res.status(200).json({
        success: true,
        url: session.url
      });
    }

    // COD / BKASH / NAGAD
    const order =
      await prisma.order.create({
        data: {

          totalPrice,

          paymentMethod,

          paymentStatus:
            paymentMethod === "COD"
              ? false
              : true,

          address,

          userId,

          orderItems: {
            create:
              cartItems.map((item) => ({
                productId:
                  item.product.id,

                quantity:
                  item.quantity,

                price:
                  item.product.price
              }))
          }
        },

        include: {
          orderItems: true
        }
      });

    // clear cart
    await prisma.cart.deleteMany({
      where: {
        userId
      }
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};



// USER ORDER HISTORY
const getUserOrders =
  async (req, res) => {

    try {

      const userId = req.user.id;

      const orders =
        await prisma.order.findMany({
          where: {
            userId
          },

          include: {
            orderItems: {
              include: {
                product: true
              }
            }
          },

          orderBy: {
            createdAt: "desc"
          }
        });

      res.status(200).json({
        success: true,
        totalOrders: orders.length,
        orders
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



// ADMIN ALL ORDERS
const getAllOrders =
  async (req, res) => {

    try {

      const orders =
        await prisma.order.findMany({

          include: {

            user: {
              select: {
                name: true,
                email: true
              }
            },

            orderItems: {
              include: {
                product: true
              }
            }
          },

          orderBy: {
            createdAt: "desc"
          }
        });

      res.status(200).json({
        success: true,
        totalOrders: orders.length,
        orders
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



// UPDATE ORDER STATUS
const updateOrderStatus =
  async (req, res) => {

    try {

      const { orderId } = req.params;

      const { status } = req.body;

      const updatedOrder =
        await prisma.order.update({
          where: {
            id: orderId
          },

          data: {
            orderStatus: status
          }
        });

      res.status(200).json({
        success: true,
        message:
          "Order status updated",

        updatedOrder
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};
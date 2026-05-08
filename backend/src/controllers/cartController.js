const prisma = require("../config/prisma");


// ADD TO CART
const addToCart = async (req, res) => {

  try {

    const userId = req.user.id;

    const { productId } = req.body;

    // validation
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID required"
      });
    }

    // check product
    const product =
      await prisma.product.findUnique({
        where: {
          id: productId
        }
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // check existing cart item
    const existingCart =
      await prisma.cart.findFirst({
        where: {
          userId,
          productId
        }
      });

    // if already exists
    if (existingCart) {

      const updatedCart =
        await prisma.cart.update({
          where: {
            id: existingCart.id
          },

          data: {
            quantity:
              existingCart.quantity + 1
          }
        });

      return res.status(200).json({
        success: true,
        message: "Cart quantity updated",
        updatedCart
      });
    }

    // create cart
    const cart =
      await prisma.cart.create({
        data: {
          userId,
          productId
        }
      });

    res.status(201).json({
      success: true,
      message: "Added to cart",
      cart
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};



// GET USER CART
const getUserCart = async (req, res) => {

  try {

    const userId = req.user.id;

    const cartItems =
      await prisma.cart.findMany({
        where: {
          userId
        },

        include: {
          product: true
        }
      });

    // total price
    let totalPrice = 0;

    cartItems.forEach((item) => {

      totalPrice +=
        item.product.price *
        item.quantity;
    });

    res.status(200).json({
      success: true,
      totalItems: cartItems.length,
      totalPrice,
      cartItems
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};



// INCREASE QUANTITY
const increaseQuantity =
  async (req, res) => {

    try {

      const { cartId } = req.params;

      const cart =
        await prisma.cart.findUnique({
          where: {
            id: cartId
          }
        });

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found"
        });
      }

      const updatedCart =
        await prisma.cart.update({
          where: {
            id: cartId
          },

          data: {
            quantity:
              cart.quantity + 1
          }
        });

      res.status(200).json({
        success: true,
        message: "Quantity increased",
        updatedCart
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



// DECREASE QUANTITY
const decreaseQuantity =
  async (req, res) => {

    try {

      const { cartId } = req.params;

      const cart =
        await prisma.cart.findUnique({
          where: {
            id: cartId
          }
        });

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart item not found"
        });
      }

      // remove if quantity 1
      if (cart.quantity === 1) {

        await prisma.cart.delete({
          where: {
            id: cartId
          }
        });

        return res.status(200).json({
          success: true,
          message:
            "Item removed from cart"
        });
      }

      // decrease quantity
      const updatedCart =
        await prisma.cart.update({
          where: {
            id: cartId
          },

          data: {
            quantity:
              cart.quantity - 1
          }
        });

      res.status(200).json({
        success: true,
        message: "Quantity decreased",
        updatedCart
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



// REMOVE CART ITEM
const removeCartItem =
  async (req, res) => {

    try {

      const { cartId } = req.params;

      await prisma.cart.delete({
        where: {
          id: cartId
        }
      });

      res.status(200).json({
        success: true,
        message: "Cart item removed"
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
  addToCart,
  getUserCart,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem
};
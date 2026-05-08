const prisma = require("../config/prisma");


// ADD WISHLIST
const addWishlist = async (req, res) => {

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

    // check existing
    const existingWishlist =
      await prisma.wishlist.findFirst({
        where: {
          userId,
          productId
        }
      });

    if (existingWishlist) {
      return res.status(400).json({
        success: false,
        message:
          "Already in wishlist"
      });
    }

    // create wishlist
    const wishlist =
      await prisma.wishlist.create({
        data: {
          userId,
          productId
        }
      });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      wishlist
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};



// GET USER WISHLIST
const getUserWishlist =
  async (req, res) => {

    try {

      const userId = req.user.id;

      const wishlist =
        await prisma.wishlist.findMany({
          where: {
            userId
          },

          include: {
            product: true
          }
        });

      res.status(200).json({
        success: true,
        totalWishlist: wishlist.length,
        wishlist
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



// REMOVE WISHLIST
const removeWishlist =
  async (req, res) => {

    try {

      const { wishlistId } = req.params;

      await prisma.wishlist.delete({
        where: {
          id: wishlistId
        }
      });

      res.status(200).json({
        success: true,
        message:
          "Removed from wishlist"
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
  addWishlist,
  getUserWishlist,
  removeWishlist
};
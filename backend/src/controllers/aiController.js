const prisma = require("../config/prisma");

const {
  generateAIResponse
} = require("../services/aiService");



// AI CHAT
const aiChat = async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message required"
      });
    }

    // lower case
    const lowerMessage =
      message.toLowerCase();

    // detect budget
    const budgetMatch =
      lowerMessage.match(/\d+/);

    let budget = null;

    if (budgetMatch) {
      budget = Number(budgetMatch[0]);
    }

    // keywords
    const keywords =
      lowerMessage.split(" ");

    // build search condition
    let where = {};

    // search by title
    where.OR = keywords.map((word) => ({
      title: {
        contains: word,
        mode: "insensitive"
      }
    }));

    // budget filter
    if (budget) {
      where.price = {
        lte: budget
      };
    }

    // find products
    const products =
      await prisma.product.findMany({
        where,

        take: 5
      });

    // product info text
    let productText = "";

    products.forEach((product) => {

      productText += `
Product:
Name: ${product.title}
Price: ${product.price} Tk
Description: ${product.description}
Rating: ${product.rating}
      `;
    });

    // AI prompt
    const prompt = `
User message:
${message}

Matching products:
${productText}

Recommend products naturally.
Convince user politely.
Mention price and features.
    `;

    // AI response
    const aiReply =
      await generateAIResponse(prompt);

    res.status(200).json({
      success: true,

      aiReply,

      products
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI server error"
    });
  }
};



// AI QUICK ADD TO CART
const aiAddToCart =
  async (req, res) => {

    try {

      const userId = req.user.id;

      const { productId } = req.body;

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

      // check existing cart
      const existingCart =
        await prisma.cart.findFirst({
          where: {
            userId,
            productId
          }
        });

      // update quantity
      if (existingCart) {

        await prisma.cart.update({
          where: {
            id: existingCart.id
          },

          data: {
            quantity:
              existingCart.quantity + 1
          }
        });

      } else {

        await prisma.cart.create({
          data: {
            userId,
            productId
          }
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Added to cart from AI"
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
  aiChat,
  aiAddToCart
};
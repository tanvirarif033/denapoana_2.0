const prisma = require("../config/prisma");

const cloudinary =
  require("../config/cloudinary");


// CREATE PRODUCT
const createProduct = async (req, res) => {

  try {

    const {
      title,
      description,
      price,
      stock,
      categoryId
    } = req.body;

    // validation
    if (
      !title ||
      !description ||
      !price ||
      !stock ||
      !categoryId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    // image required
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image required"
      });
    }

    // upload image
    const base64 =
      req.file.buffer.toString("base64");

    const dataURI =
      `data:${req.file.mimetype};base64,${base64}`;

    const uploadedImage =
      await cloudinary.uploader.upload(
        dataURI,
        {
          folder: "denpoana_products"
        }
      );

    // create product
    const product =
      await prisma.product.create({
        data: {
          title,
          description,
          price: parseFloat(price),
          stock: parseInt(stock),

          images: [uploadedImage.secure_url],

          categoryId
        }
      });

    res.status(201).json({
      success: true,
      message: "Product created",
      product
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// GET ALL PRODUCTS
const getProducts = async (req, res) => {

  try {

    const page = Number(req.query.page) || 1;

    const limit = 6;

    const skip = (page - 1) * limit;

    // filters
    const search = req.query.search || "";

    const category = req.query.category || "";

    const sort = req.query.sort || "";

    // dynamic filter
    let where = {};

    // search
    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive"
      };
    }

    // category
    if (category) {
      where.category = {
        slug: category
      };
    }

    // sorting
    let orderBy = {};

    if (sort === "low") {
      orderBy.price = "asc";
    }

    if (sort === "high") {
      orderBy.price = "desc";
    }

    // get products
    const products =
      await prisma.product.findMany({
        where,

        include: {
          category: true
        },

        orderBy,

        skip,

        take: limit
      });

    // total count
    const totalProducts =
      await prisma.product.count({
        where
      });

    res.status(200).json({
      success: true,

      currentPage: page,

      totalPages:
        Math.ceil(totalProducts / limit),

      totalProducts,

      products
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const product =
      await prisma.product.findUnique({
        where: {
          id
        },

        include: {
          category: true,

          reviews: {
            include: {
              user: {
                select: {
                  name: true,
                  profileImage: true
                }
              }
            }
          }
        }
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      title,
      description,
      price,
      stock,
      categoryId
    } = req.body;

    let imageUrl;

    // upload new image if exists
    if (req.file) {

      const base64 =
        req.file.buffer.toString("base64");

      const dataURI =
        `data:${req.file.mimetype};base64,${base64}`;

      const uploadedImage =
        await cloudinary.uploader.upload(
          dataURI,
          {
            folder: "denpoana_products"
          }
        );

      imageUrl =
        uploadedImage.secure_url;
    }

    const updatedProduct =
      await prisma.product.update({
        where: {
          id
        },

        data: {
          title,
          description,

          price: parseFloat(price),

          stock: parseInt(stock),

          categoryId,

          ...(imageUrl && {
            images: [imageUrl]
          })
        }
      });

    res.status(200).json({
      success: true,
      message: "Product updated",
      updatedProduct
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {

  try {

    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id
      }
    });

    res.status(200).json({
      success: true,
      message: "Product deleted"
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
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
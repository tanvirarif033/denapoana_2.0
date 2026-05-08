const prisma = require("../config/prisma");


// CREATE CATEGORY
const createCategory = async (req, res) => {

  try {

    const { name } = req.body;

    // validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }

    // slug generate
    const slug = name
      .toLowerCase()
      .split(" ")
      .join("-");

    // check existing
    const existingCategory =
      await prisma.category.findUnique({
        where: {
          slug
        }
      });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists"
      });
    }

    // create category
    const category =
      await prisma.category.create({
        data: {
          name,
          slug
        }
      });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// GET ALL CATEGORIES
const getCategories = async (req, res) => {

  try {

    const categories =
      await prisma.category.findMany({
        orderBy: {
          name: "asc"
        }
      });

    res.status(200).json({
      success: true,
      categories
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// UPDATE CATEGORY
const updateCategory = async (req, res) => {

  try {

    const { id } = req.params;

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name required"
      });
    }

    const slug = name
      .toLowerCase()
      .split(" ")
      .join("-");

    const updatedCategory =
      await prisma.category.update({
        where: {
          id
        },
        data: {
          name,
          slug
        }
      });

    res.status(200).json({
      success: true,
      message: "Category updated",
      updatedCategory
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// DELETE CATEGORY
const deleteCategory = async (req, res) => {

  try {

    const { id } = req.params;

    await prisma.category.delete({
      where: {
        id
      }
    });

    res.status(200).json({
      success: true,
      message: "Category deleted"
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
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
};
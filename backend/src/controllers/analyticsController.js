const prisma = require("../config/prisma");



// GET DASHBOARD ANALYTICS
const getDashboardAnalytics =
  async (req, res) => {

    try {

      // total users
      const totalUsers =
        await prisma.user.count();

      // total orders
      const totalOrders =
        await prisma.order.count();

      // total products
      const totalProducts =
        await prisma.product.count();

      // revenue orders
      const revenueOrders =
        await prisma.order.findMany({
          where: {
            paymentStatus: true
          }
        });

      // total revenue
      let totalRevenue = 0;

      revenueOrders.forEach((order) => {

        totalRevenue +=
          order.totalPrice;
      });

      res.status(200).json({
        success: true,

        analytics: {
          totalUsers,
          totalOrders,
          totalProducts,
          totalRevenue
        }
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



// MONTHLY SALES
const getMonthlySales =
  async (req, res) => {

    try {

      const orders =
        await prisma.order.findMany({
          where: {
            paymentStatus: true
          }
        });

      // months
      const monthlyData = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ].map((month) => ({
        month,
        sales: 0
      }));

      // calculate sales
      orders.forEach((order) => {

        const monthIndex =
          new Date(
            order.createdAt
          ).getMonth();

        monthlyData[monthIndex].sales +=
          order.totalPrice;
      });

      res.status(200).json({
        success: true,
        monthlySales: monthlyData
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



// TOP SELLING PRODUCTS
const getTopSellingProducts =
  async (req, res) => {

    try {

      const orderItems =
        await prisma.orderItem.findMany({
          include: {
            product: true
          }
        });

      // product sales map
      const productSalesMap = {};

      orderItems.forEach((item) => {

        const productId =
          item.product.id;

        if (!productSalesMap[productId]) {

          productSalesMap[productId] = {
            productId,

            title:
              item.product.title,

            image:
              item.product.images[0],

            totalSold: 0
          };
        }

        productSalesMap[
          productId
        ].totalSold += item.quantity;
      });

      // convert array
      const topProducts =
        Object.values(productSalesMap)

          .sort(
            (a, b) =>
              b.totalSold - a.totalSold
          )

          .slice(0, 8);

      res.status(200).json({
        success: true,
        topProducts
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



// TOP CATEGORIES
const getTopCategories =
  async (req, res) => {

    try {

      const products =
        await prisma.product.findMany({
          include: {
            category: true,
            orderItems: true
          }
        });

      // category sales
      const categoryMap = {};

      products.forEach((product) => {

        const categoryName =
          product.category.name;

        // total sold
        let totalSold = 0;

        product.orderItems.forEach((item) => {

          totalSold += item.quantity;
        });

        if (!categoryMap[categoryName]) {

          categoryMap[categoryName] = {
            category: categoryName,
            totalSold: 0
          };
        }

        categoryMap[
          categoryName
        ].totalSold += totalSold;
      });

      const topCategories =
        Object.values(categoryMap)

          .sort(
            (a, b) =>
              b.totalSold - a.totalSold
          )

          .slice(0, 6);

      res.status(200).json({
        success: true,
        topCategories
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
  getDashboardAnalytics,
  getMonthlySales,
  getTopSellingProducts,
  getTopCategories
};
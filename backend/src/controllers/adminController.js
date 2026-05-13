const prisma =
  require("../config/prisma");



const getAnalytics =
  async (req, res) => {

    try {

      const totalUsers =
        await prisma.user.count();

      const totalOrders =
        await prisma.order.count();


      const orders =
        await prisma.order.findMany();


      const totalRevenue =
        orders.reduce(

          (acc, item) =>

            acc + item.totalAmount,

          0
        );


      res.status(200).json({

        totalUsers,

        totalOrders,

        totalRevenue,

        monthlyRevenue: [

          {
            month: "Jan",
            revenue: 12000
          },

          {
            month: "Feb",
            revenue: 25000
          },

          {
            month: "Mar",
            revenue: 18000
          },

          {
            month: "Apr",
            revenue: 40000
          }
        ]
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });
    }
  };



module.exports = {
  getAnalytics
};
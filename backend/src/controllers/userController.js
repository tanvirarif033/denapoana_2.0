const prisma = require("../config/prisma");

const cloudinary =
  require("../config/cloudinary");



// GET USER PROFILE
const getUserProfile =
  async (req, res) => {

    try {

      const userId = req.user.id;

      const user =
        await prisma.user.findUnique({
          where: {
            id: userId
          },

          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            address: true,
            profileImage: true,
            createdAt: true
          }
        });

      res.status(200).json({
        success: true,
        user
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



// UPDATE PROFILE
const updateProfile =
  async (req, res) => {

    try {

      const userId = req.user.id;

      const {
        name,
        phone,
        address
      } = req.body;

      let imageUrl;

      // image upload
      if (req.file) {

        const base64 =
          req.file.buffer.toString(
            "base64"
          );

        const dataURI =
          `data:${req.file.mimetype};base64,${base64}`;

        const uploadedImage =
          await cloudinary.uploader.upload(
            dataURI,
            {
              folder:
                "denpoana_profiles"
            }
          );

        imageUrl =
          uploadedImage.secure_url;
      }

      // update user
      const updatedUser =
        await prisma.user.update({
          where: {
            id: userId
          },

          data: {
            ...(name && { name }),

            ...(phone && { phone }),

            ...(address && { address }),

            ...(imageUrl && {
              profileImage: imageUrl
            })
          },

          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            address: true,
            profileImage: true
          }
        });

      res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",

        updatedUser
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



// DELETE PROFILE IMAGE
const deleteProfileImage =
  async (req, res) => {

    try {

      const userId = req.user.id;

      await prisma.user.update({
        where: {
          id: userId
        },

        data: {
          profileImage: null
        }
      });

      res.status(200).json({
        success: true,
        message:
          "Profile image removed"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



// ADMIN GET ALL USERS
const getAllUsers =
  async (req, res) => {

    try {

      const users =
        await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            profileImage: true,
            createdAt: true
          },

          orderBy: {
            createdAt: "desc"
          }
        });

      res.status(200).json({
        success: true,
        totalUsers: users.length,
        users
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  };



// ADMIN CHANGE ROLE
const changeUserRole =
  async (req, res) => {

    try {

      const { userId } = req.params;

      const { role } = req.body;

      // validation
      if (
        role !== "USER" &&
        role !== "ADMIN"
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid role"
        });
      }

      const updatedUser =
        await prisma.user.update({
          where: {
            id: userId
          },

          data: {
            role
          }
        });

      res.status(200).json({
        success: true,
        message:
          "User role updated",

        updatedUser
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
  getUserProfile,
  updateProfile,
  deleteProfileImage,
  getAllUsers,
  changeUserRole
};
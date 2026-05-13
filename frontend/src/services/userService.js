import api from "../api/axios";


// =========================
// GET PROFILE
// =========================
export const getProfile =
  async () => {

    const response =
      await api.get(
        "/users/profile"
      );

    return response.data;
  };



// =========================
// UPDATE PROFILE
// =========================
export const updateProfile =
  async (formData) => {

    const response =
      await api.put(
        "/users/profile",
        formData
      );

    return response.data;
  };



// =========================
// UPLOAD PROFILE IMAGE
// =========================
export const uploadProfileImage =
  async (file) => {

    const formData =
      new FormData();

    // IMPORTANT
    formData.append(
      "profilePicture",
      file
    );

    const response =
      await api.put(

        "/users/profile-image",

        formData,

        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  };



// =========================
// DELETE PROFILE IMAGE
// =========================
export const deleteProfileImage =
  async () => {

    const response =
      await api.delete(
        "/users/profile-image"
      );

    return response.data;
  };



// =========================
// ORDER HISTORY
// =========================
export const getOrderHistory =
  async () => {

    const response =
      await api.get(
        "/orders/my-orders"
      );

    return response.data;
  };
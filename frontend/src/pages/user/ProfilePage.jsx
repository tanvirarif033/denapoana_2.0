import {
  useEffect,
  useState
} from "react";

import toast
from "react-hot-toast";

import Navbar
from "../../components/layout/Navbar";

import Footer
from "../../components/layout/Footer";

import ProfileSidebar
from "../../components/profile/ProfileSidebar";

import ProfileImage
from "../../components/profile/ProfileImage";

import ProfileInfo
from "../../components/profile/ProfileInfo";

import OrderHistory
from "../../components/profile/OrderHistory";

import {

  getProfile,

  updateProfile,

  uploadProfileImage,

  deleteProfileImage,

  getOrderHistory

} from "../../services/userService";


function ProfilePage() {

  const [activeTab,
    setActiveTab] =
    useState("profile");


  const [user, setUser] =
    useState(null);

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [imagePreview,
    setImagePreview] =
    useState("");


  const [formData,
    setFormData] =
    useState({

      name: "",
      phone: "",
      address: ""
    });



  // =========================
  // FETCH PROFILE
  // =========================
  const fetchProfile =
    async () => {

      try {

        const data =
          await getProfile();

        setUser(data.user);

        setFormData({

          name:
            data.user.name || "",

          phone:
            data.user.phone || "",

          address:
            data.user.address || ""
        });

      } catch (error) {

        console.log(error);
      }
    };



  // =========================
  // FETCH ORDERS
  // =========================
  const fetchOrders =
    async () => {

      try {

        const data =
          await getOrderHistory();

        setOrders(
          data.orders || []
        );

      } catch (error) {

        console.log(error);
      }
    };



  useEffect(() => {

    fetchProfile();

    fetchOrders();

  }, []);




  // =========================
  // CHANGE
  // =========================
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value
      });
    };




  // =========================
  // UPDATE PROFILE
  // =========================
  const handleSubmit =
    async () => {

      try {

        setLoading(true);

        await updateProfile(
          formData
        );

        toast.success(
          "Profile Updated"
        );

        fetchProfile();

      } catch (error) {

        toast.error(
          "Update Failed"
        );

      } finally {

        setLoading(false);
      }
    };




  // =========================
  // IMAGE UPLOAD
  // =========================
  const handleImageChange =
    async (e) => {

      try {

        const file =
          e.target.files[0];

        if (!file) return;


        setImagePreview(
          URL.createObjectURL(file)
        );


        await uploadProfileImage(
          file
        );

        toast.success(
          "Profile Photo Updated"
        );

        fetchProfile();

      } catch (error) {

        console.log(error);

        toast.error(
          "Upload Failed"
        );
      }
    };




  // =========================
  // DELETE IMAGE
  // =========================
  const handleDeleteImage =
    async () => {

      try {

        await deleteProfileImage();

        toast.success(
          "Photo Deleted"
        );

        fetchProfile();

      } catch (error) {

        toast.error(
          "Delete Failed"
        );
      }
    };



  return (

    <>
      <Navbar />

      <div className="container py-5">

        <div className="row g-4">


          {/* SIDEBAR */}
          <div className="col-lg-3">

            <ProfileSidebar

              activeTab={
                activeTab
              }

              setActiveTab={
                setActiveTab
              }
            />

          </div>



          {/* CONTENT */}
          <div className="col-lg-9">


            {/* PROFILE TAB */}
            {
              activeTab ===
              "profile" && (

                <>

                  <ProfileImage

                    user={user}

                    imagePreview={
                      imagePreview
                    }

                    handleImageChange={
                      handleImageChange
                    }

                    handleDeleteImage={
                      handleDeleteImage
                    }
                  />


                  <ProfileInfo

                    formData={
                      formData
                    }

                    handleChange={
                      handleChange
                    }

                    handleSubmit={
                      handleSubmit
                    }

                    loading={
                      loading
                    }
                  />

                </>
              )
            }



            {/* ORDERS TAB */}
            {
              activeTab ===
              "orders" && (

                <OrderHistory
                  orders={orders}
                />
              )
            }

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;
import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import toast
from "react-hot-toast";

import api
from "../../api/axios";

import {
  useAuth
} from "../../context/AuthContext";

import {
  useCart
} from "../../context/CartContext";

import Navbar
from "../../components/layout/Navbar";



function LoginPage() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const {
    fetchCartCount,
    fetchWishlistCount
  } = useCart();


  const [formData, setFormData] =
    useState({

      email: "",
      password: ""

    });


  const [loading, setLoading] =
    useState(false);



  // =========================
  // INPUT CHANGE
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
  // SUBMIT
  // =========================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);


        const response =
          await api.post(

            "/auth/login",

            formData

          );



        // SUCCESS
        if (
          response.data.success
        ) {


          // LOGIN CONTEXT
          login(

            response.data.token,

            response.data.user

          );



          // ======================
          // SAVE LOCAL STORAGE
          // ======================

          localStorage.setItem(

            "token",

            response.data.token

          );


          localStorage.setItem(

            "user",

            JSON.stringify(

              response.data.user

            )

          );



          // IMPORTANT
          // AI CHAT USER MEMORY

          localStorage.setItem(

            "userId",

            response.data.user.id

          );




          // ======================
          // UPDATE NAVBAR COUNTS
          // ======================

          await fetchCartCount();

          await fetchWishlistCount();




          toast.success(
            "Login Successful 🎉"
          );



          navigate("/");

        }

      }
      catch (error) {

        console.log(error);


        toast.error(

          error.response?.data?.message

          ||

          "Login Failed"

        );

      }
      finally {

        setLoading(false);

      }

    };





  return (

    <>

      <Navbar />



      <div

        className="
        container
        d-flex
        justify-content-center
        align-items-center
        "

        style={{
          minHeight:"90vh"
        }}

      >


        <div

          className="
          card
          shadow-lg
          border-0
          p-4
          "

          style={{

            width:"400px",

            borderRadius:"20px"

          }}

        >



          <h2

            className="
            text-center
            mb-4
            fw-bold
            "

          >

            Login

          </h2>





          <form
            onSubmit={
              handleSubmit
            }
          >


            {/* EMAIL */}

            <div className="mb-3">

              <label

                className="
                form-label
                fw-semibold
                "

              >

                Email

              </label>


              <input

                type="email"

                className="
                form-control
                py-2
                "

                name="email"

                value={
                  formData.email
                }

                onChange={
                  handleChange
                }

                required

              />

            </div>





            {/* PASSWORD */}

            <div className="mb-4">

              <label

                className="
                form-label
                fw-semibold
                "

              >

                Password

              </label>


              <input

                type="password"

                className="
                form-control
                py-2
                "

                name="password"

                value={
                  formData.password
                }

                onChange={
                  handleChange
                }

                required

              />

            </div>





            <button

              type="submit"

              disabled={loading}

              className="
              btn
              btn-warning
              w-100
              fw-bold
              py-2
              "

            >

              {

                loading

                ?

                "Loading..."

                :

                "Login"

              }

            </button>


          </form>





          <p

            className="
            text-center
            mt-4
            "

          >

            Don't have an account?


            <Link

              to="/register"

              className="
              ms-2
              fw-bold
              text-decoration-none
              "

            >

              Register

            </Link>

          </p>

        </div>

      </div>

    </>

  );

}

export default LoginPage;
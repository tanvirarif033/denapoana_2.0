import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../api/axios";

import {
  useAuth
} from "../../context/AuthContext";

import Navbar
from "../../components/layout/Navbar";



function LoginPage() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData, setFormData] =
    useState({

      email: "",
      password: ""
    });

  const [loading, setLoading] =
    useState(false);


  // input change
  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value
    });
  };


  // submit
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

        // success
        if (response.data.success) {

          login(
            response.data.token,
            response.data.user
          );

          toast.success(
            "Login Successful"
          );

          navigate("/");
        }

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Login Failed"
        );

      } finally {

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
          minHeight: "90vh"
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
            width: "400px",
            borderRadius: "15px"
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
            onSubmit={handleSubmit}
          >

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

                className="form-control"

                name="email"

                value={formData.email}

                onChange={handleChange}

                required
              />

            </div>


            <div className="mb-3">

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

                className="form-control"

                name="password"

                value={formData.password}

                onChange={handleChange}

                required
              />

            </div>


            <button
              type="submit"

              className="
              btn btn-warning
              w-100
              fw-bold
              "
            >

              {
                loading
                  ? "Loading..."
                  : "Login"
              }

            </button>

          </form>


          <p
            className="
            text-center
            mt-3
            "
          >

            Don't have an account?

            <Link
              to="/register"
              className="
              ms-2
              fw-bold
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
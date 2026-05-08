import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../api/axios";

import Navbar
from "../../components/layout/Navbar";



function RegisterPage() {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      password: ""
    });


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
            "/auth/register",
            formData
          );

        if (response.data.success) {

          toast.success(
            "Registration Successful"
          );

          navigate("/login");
        }

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Registration Failed"
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
            Register
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
                Name
              </label>

              <input
                type="text"

                className="form-control"

                name="name"

                value={formData.name}

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
                  : "Register"
              }

            </button>

          </form>


          <p
            className="
            text-center
            mt-3
            "
          >

            Already have an account?

            <Link
              to="/login"
              className="
              ms-2
              fw-bold
              "
            >
              Login
            </Link>

          </p>

        </div>

      </div>
    </>
  );
}

export default RegisterPage;
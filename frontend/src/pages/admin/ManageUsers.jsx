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

import AdminSidebar
from "../../components/admin/AdminSidebar";

import {

  getAllUsers,
  makeAdmin

} from "../../services/adminService";



function ManageUsers() {

  const [users,
    setUsers] =
    useState([]);




  // ======================
  // FETCH USERS
  // ======================

  const fetchUsers =
    async () => {

      try {

        const data =
          await getAllUsers();

        setUsers(
          data.users || []
        );

      } catch (error) {

        console.log(error);
      }
    };




  useEffect(() => {

    fetchUsers();

  }, []);




  // ======================
  // MAKE ADMIN
  // ======================

  const handleAdmin =
    async (id) => {

      try {

        await makeAdmin(id);

        toast.success(
          "User is now admin"
        );

        fetchUsers();

      } catch (error) {

        toast.error(
          "Failed"
        );
      }
    };




  return (

    <>
      <Navbar />

      <div className="container py-5">

        <div className="row">


          {/* SIDEBAR */}
          <div className="col-lg-3 mb-4">

            <AdminSidebar />

          </div>




          {/* CONTENT */}
          <div className="col-lg-9">

            <div
              className="
              card
              border-0
              shadow-sm
              rounded-4
              p-4
              "
            >

              <h2
                className="
                fw-bold
                mb-4
                "
              >
                Manage Users
              </h2>




              <div className="table-responsive">

                <table
                  className="
                  table
                  align-middle
                  "
                >

                  <thead>

                    <tr>

                      <th>Name</th>

                      <th>Email</th>

                      <th>Role</th>

                      <th>Action</th>

                    </tr>

                  </thead>




                  <tbody>

                    {
                      users.map((user) => (

                        <tr
                          key={user.id}
                        >

                          <td>
                            {user.name}
                          </td>

                          <td>
                            {user.email}
                          </td>

                          <td>

                            <span
                              className={

                                user.role === "ADMIN"

                                  ? "badge bg-success"

                                  : "badge bg-secondary"
                              }
                            >

                              {user.role}

                            </span>

                          </td>




                          <td>

                            {
                              user.role !== "ADMIN" && (

                                <button
                                  className="
                                  btn btn-warning
                                  btn-sm
                                  "
                                  onClick={() =>
                                    handleAdmin(
                                      user.id
                                    )
                                  }
                                >
                                  Make Admin
                                </button>
                              )
                            }

                          </td>

                        </tr>
                      ))
                    }

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default ManageUsers;
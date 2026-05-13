import {
  Link,
  useLocation
} from "react-router-dom";

import {
  FaChartBar,
  FaBoxOpen,
  FaPlus,
  FaShoppingCart,
  FaUsers,
  FaTags
} from "react-icons/fa";



function AdminSidebar() {

  const location =
    useLocation();



  // =========================
  // ACTIVE CLASS
  // =========================
  const activeClass =
    (path) => {

      return location.pathname === path
        ? "btn-dark text-white"
        : "btn-outline-dark";

    };



  return (

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
        Admin Panel
      </h2>




      <div
        className="
        d-flex
        flex-column
        gap-3
        "
      >

        {/* DASHBOARD */}
        <Link
          to="/admin"
          className={`
            btn
            ${activeClass("/admin")}
            fw-bold
            text-start
          `}
        >

          <FaChartBar
            className="me-2"
          />

          Dashboard

        </Link>




        {/* MANAGE PRODUCTS */}
        <Link
          to="/admin/manage-products"
          className={`
            btn
            ${activeClass("/admin/manage-products")}
            fw-bold
            text-start
          `}
        >

          <FaBoxOpen
            className="me-2"
          />

          Manage Products

        </Link>





        {/* ADD PRODUCT */}
        <Link
          to="/admin/add-product"
          className={`
            btn
            ${activeClass("/admin/add-product")}
            fw-bold
            text-start
          `}
        >

          <FaPlus
            className="me-2"
          />

          Add Product

        </Link>





        {/* CREATE CATEGORY */}
        <Link
          to="/admin/category"
          className={`
            btn
            ${activeClass("/admin/category")}
            fw-bold
            text-start
          `}
        >

          <FaTags
            className="me-2"
          />

          Create Category

        </Link>





        {/* MANAGE ORDERS */}
        <Link
          to="/admin/manage-orders"
          className={`
            btn
            ${activeClass("/admin/manage-orders")}
            fw-bold
            text-start
          `}
        >

          <FaShoppingCart
            className="me-2"
          />

          Manage Orders

        </Link>





        {/* MANAGE USERS */}
        <Link
          to="/admin/manage-users"
          className={`
            btn
            ${activeClass("/admin/manage-users")}
            fw-bold
            text-start
          `}
        >

          <FaUsers
            className="me-2"
          />

          Manage Users

        </Link>

      </div>

    </div>

  );
}

export default AdminSidebar;